'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FilterLink = require('../containers/FilterLink');

var _FilterLink2 = _interopRequireDefault(_FilterLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
  return _react2.default.createElement(
    'p',
    null,
    'Show:',
    " ",
    _react2.default.createElement(
      _FilterLink2.default,
      { filter: 'SHOW_ALL' },
      'All'
    ),
    ", ",
    _react2.default.createElement(
      _FilterLink2.default,
      { filter: 'SHOW_ACTIVE' },
      'Active'
    ),
    ", ",
    _react2.default.createElement(
      _FilterLink2.default,
      { filter: 'SHOW_COMPLETED' },
      'Completed'
    )
  );
};

exports.default = Footer;
module.exports = exports['default'];
//# sourceMappingURL=Footer.js.map