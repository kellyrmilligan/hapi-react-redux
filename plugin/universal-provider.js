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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UniversalProvider = function (_Component) {
  (0, _inherits3.default)(UniversalProvider, _Component);

  function UniversalProvider() {
    (0, _classCallCheck3.default)(this, UniversalProvider);
    return (0, _possibleConstructorReturn3.default)(this, (UniversalProvider.__proto__ || Object.getPrototypeOf(UniversalProvider)).apply(this, arguments));
  }

  (0, _createClass3.default)(UniversalProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        config: this.props.config,
        pre: this.props.config,
        serverContext: this.props.config
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);
  return UniversalProvider;
}(_react.Component);

UniversalProvider.childContextTypes = {
  config: _react.PropTypes.object,
  pre: _react.PropTypes.object,
  serverContext: _react.PropTypes.object
};
exports.default = UniversalProvider;
module.exports = exports['default'];
//# sourceMappingURL=universal-provider.js.map