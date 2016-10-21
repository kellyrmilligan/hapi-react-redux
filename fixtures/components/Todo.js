'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Todo = function Todo(_ref) {
  var onClick = _ref.onClick;
  var completed = _ref.completed;
  var text = _ref.text;
  return _react2.default.createElement(
    'li',
    {
      onClick: onClick,
      style: {
        textDecoration: completed ? 'line-through' : 'none'
      }
    },
    text
  );
};

Todo.propTypes = {
  onClick: _react.PropTypes.func.isRequired,
  completed: _react.PropTypes.bool.isRequired,
  text: _react.PropTypes.string.isRequired
};

exports.default = Todo;
module.exports = exports['default'];
//# sourceMappingURL=Todo.js.map