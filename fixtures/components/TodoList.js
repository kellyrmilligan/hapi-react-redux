'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Todo = require('./Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoList = function TodoList(_ref) {
  var todos = _ref.todos;
  var serverContext = _ref.serverContext;
  var pre = _ref.pre;
  var config = _ref.config;
  var onTodoClick = _ref.onTodoClick;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'ul',
      null,
      todos.map(function (todo) {
        return _react2.default.createElement(_Todo2.default, (0, _extends3.default)({
          key: todo.id
        }, todo, {
          onClick: function onClick() {
            return onTodoClick(todo.id);
          }
        }));
      })
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        serverContext.test
      ),
      _react2.default.createElement(
        'p',
        null,
        pre.preTest
      ),
      _react2.default.createElement(
        'p',
        null,
        config.honeybadger
      )
    )
  );
};

TodoList.propTypes = {
  todos: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    id: _react.PropTypes.number.isRequired,
    completed: _react.PropTypes.bool.isRequired,
    text: _react.PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: _react.PropTypes.func.isRequired
};

exports.default = TodoList;
module.exports = exports['default'];
//# sourceMappingURL=TodoList.js.map