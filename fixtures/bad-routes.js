'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BadComponent = function (_React$Component) {
  (0, _inherits3.default)(BadComponent, _React$Component);

  function BadComponent() {
    (0, _classCallCheck3.default)(this, BadComponent);
    return (0, _possibleConstructorReturn3.default)(this, (BadComponent.__proto__ || Object.getPrototypeOf(BadComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(BadComponent, [{
    key: 'render',
    value: function render() {
      // return (
      //   <main>
      //     <h2>home</h2>
      //   </main>
      // )
    }
  }]);
  return BadComponent;
}(_react2.default.Component);

var routes = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _app2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: BadComponent })
);

exports.default = routes;
module.exports = exports['default'];
//# sourceMappingURL=bad-routes.js.map