'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _iso = require('iso');

var _iso2 = _interopRequireDefault(_iso);

var _hoek = require('hoek');

var _hoek2 = _interopRequireDefault(_hoek);

var _routeResolver = require('route-resolver');

var _routeResolver2 = _interopRequireDefault(_routeResolver);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hapiReactReduxPlugin(server, options, next) {

  server.decorate('server', 'hapiReactRedux', function (options) {

    _hoek2.default.assert(options, 'Missing options');
    this.realm.plugins.hapiReactRedux = this.realm.plugins.hapiReactRedux || {};
    _hoek2.default.assert(!this.realm.plugins.hapiReactRedux.settings, 'Cannot set hapiReactRedux settings more than once');
    this.realm.plugins.hapiReactRedux.settings = options;
  });

  server.decorate('reply', 'hapiReactReduxRender', function (context) {
    var _this = this;

    var realm = this.realm.plugins.hapiReactRedux;
    _hoek2.default.assert(realm.settings, 'Cannot render app without settings');

    var routes = realm.settings.routes;
    var Layout = realm.settings.layout;
    var assets = realm.settings.assets;
    var config = realm.settings.config;
    // TODO: where does this go now?
    var createStore = realm.settings.createStore;
    // any extra data
    var pre = this.request.pre;
    // is there a user?
    var auth = this.request.auth;
    var store = createStore({ auth: auth, pre: pre, config: config, serverContext: context });

    var iso = new _iso2.default();

    (0, _reactRouter.match)({ routes: routes, location: this.request.raw.req.url }, function (err, redirect, props) {
      if (err) {
        return _this.response(_boom2.default.badImplementation('There was a react router error rendering the route - ' + _this.request.raw.req.url, e));
      } else if (redirect) {
        _this.redirect(redirect.pathname + redirect.search).code(301);
      } else if (props) {
        (0, _routeResolver2.default)(props, false, { dispatch: store.dispatch }).then(function () {
          var rootHtml = null;
          var layout = null;
          try {
            rootHtml = (0, _server.renderToString)(_react2.default.createElement(
              _reactRedux.Provider,
              { store: store },
              _react2.default.createElement(_reactRouter.RouterContext, props)
            ));
          } catch (e) {
            return _this.response(_boom2.default.badImplementation('There was an error rendering the route - ' + _this.request.raw.req.url, e));
          }
          iso.add(rootHtml, {
            preloadedState: store.getState()
          });
          try {
            layout = (0, _server.renderToString)(_react2.default.createElement(Layout, { assets: assets, config: config, content: iso.render() }));
          } catch (e) {
            return _this.response(_boom2.default.badImplementation('There was an error rendering the layout while rendring the route - ' + _this.request.raw.req.url, e));
          }
          _this.response('<!doctype html>\n' + layout);
        });
      } else {
        // no errors, no redirect, we just didn't match anything
        _this.response(_boom2.default.notFound('Unable to find maching route for ' + _this.request.raw.req.url));
      }
    });
  });

  server.handler('hapiReactReduxHandler', function (route, options) {
    return function (request, reply) {
      reply.hapiReactReduxRender();
    };
  });

  next();
}

hapiReactReduxPlugin.attributes = {
  name: '@trunkclub/hapi-react-redux'
};

module.exports = {
  register: hapiReactReduxPlugin
};
//# sourceMappingURL=index.js.map