'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _universalProvider = require('./universal-provider');

var _universalProvider2 = _interopRequireDefault(_universalProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hapiReactAltPlugin(server, options, next) {

  server.decorate('server', 'hapiReactAlt', function (options) {

    _hoek2.default.assert(options, 'Missing options');
    this.realm.plugins.universalReactAlt = this.realm.plugins.universalReactAlt || {};
    _hoek2.default.assert(!this.realm.plugins.universalReactAlt.settings, 'Cannot set universalReactAlt settings more than once');
    this.realm.plugins.universalReactAlt.settings = options;
  });

  server.decorate('reply', 'hapiReactAltRender', function (context) {
    var _this = this;

    var realm = this.realm.plugins.universalReactAlt;
    _hoek2.default.assert(realm.settings, 'Cannot render app without settings');

    var routes = realm.settings.routes;
    var Layout = realm.settings.layout;
    var assets = realm.settings.assets;
    var config = realm.settings.config;
    var authStore = realm.settings.authStore; //string name of the store
    var alt = realm.settings.alt;

    // any extra data
    var pre = this.request.pre;

    // is there a user?
    var auth = this.request.auth;
    //bootstrap the user into the authStore option for later
    if (auth && alt.stores[authStore]) {
      alt.bootstrap(JSON.stringify((0, _defineProperty3.default)({}, authStore, auth)));
    }

    var iso = new _iso2.default();

    (0, _reactRouter.match)({ routes: routes, location: this.request.raw.req.url }, function (err, redirect, props) {
      if (err) {
        return _this.response(err);
      } else if (redirect) {
        _this.redirect(redirect.pathname + redirect.search).code(301);
      } else if (props) {
        (0, _routeResolver2.default)(props, false).then(function () {
          var rootHtml = null;
          var layout = null;
          try {
            rootHtml = (0, _server.renderToString)(_react2.default.createElement(
              _universalProvider2.default,
              { pre: pre, serverContext: context, config: config },
              _react2.default.createElement(_reactRouter.RouterContext, props)
            ));
          } catch (e) {
            if (e) return _this.response(e);
          }
          iso.add(rootHtml, {
            alt: alt.flush(),
            pre: pre,
            context: context,
            config: config
          });
          try {
            layout = (0, _server.renderToString)(_react2.default.createElement(Layout, { assets: assets, config: config, content: iso.render() }));
          } catch (e) {
            if (e) return _this.response(e);
          }
          _this.response('<!doctype html>\n' + layout);
        });
      } else {
        // no errors, no redirect, we just didn't match anything
        _this.response(_boom2.default.notFound('Unable to find maching route for ' + _this.request.raw.req.url));
      }
    });
  });

  server.handler('hapiReactAltHandler', function (route, options) {
    return function (request, reply) {
      reply.hapiReactAltRender();
    };
  });

  next();
}

hapiReactAltPlugin.attributes = {
  name: 'hapi-react-alt'
};

module.exports = {
  register: hapiReactAltPlugin
};
//# sourceMappingURL=index.js.map