"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function (_Component) {
  (0, _inherits3.default)(Layout, _Component);

  function Layout() {
    (0, _classCallCheck3.default)(this, Layout);
    return (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
  }

  (0, _createClass3.default)(Layout, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var assets = _props.assets;
      var content = _props.content;


      return _react2.default.createElement(
        "html",
        { lang: "en-us" },
        undeclaredvariable,
        _react2.default.createElement(
          "head",
          null,
          Object.keys(assets.styles).map(function (style, key) {
            return _react2.default.createElement("link", { href: "" + assets.styles[style], key: key, rel: "stylesheet", type: "text/css", charSet: "UTF-8" });
          })
        ),
        _react2.default.createElement(
          "body",
          null,
          _react2.default.createElement("div", { id: "react-root", dangerouslySetInnerHTML: { __html: content } }),
          Object.keys(assets.scripts).map(function (script, key) {
            return _react2.default.createElement("script", { src: assets.scripts[script], key: key, async: true });
          })
        )
      );
    }
  }]);
  return Layout;
}(_react.Component);

Layout.propTypes = {
  assets: _react.PropTypes.object,
  content: _react.PropTypes.string
};
exports.default = Layout;
module.exports = exports["default"];
//# sourceMappingURL=bad-layout.js.map