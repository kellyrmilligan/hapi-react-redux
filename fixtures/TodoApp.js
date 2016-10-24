'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _AddTodo = require('./containers/AddTodo');

var _AddTodo2 = _interopRequireDefault(_AddTodo);

var _VisibleTodoList = require('./containers/VisibleTodoList');

var _VisibleTodoList2 = _interopRequireDefault(_VisibleTodoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoApp = function (_Component) {
  (0, _inherits3.default)(TodoApp, _Component);

  function TodoApp() {
    (0, _classCallCheck3.default)(this, TodoApp);
    return (0, _possibleConstructorReturn3.default)(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).apply(this, arguments));
  }

  (0, _createClass3.default)(TodoApp, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AddTodo2.default, null),
        _react2.default.createElement(_VisibleTodoList2.default, null),
        _react2.default.createElement(_Footer2.default, null)
      );
    }
  }]);
  return TodoApp;
}(_react.Component);

exports.default = TodoApp;
module.exports = exports['default'];
//# sourceMappingURL=TodoApp.js.map