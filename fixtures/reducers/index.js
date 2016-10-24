'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _todos = require('./todos');

var _todos2 = _interopRequireDefault(_todos);

var _visibilityFilter = require('./visibilityFilter');

var _visibilityFilter2 = _interopRequireDefault(_visibilityFilter);

var _auth = require('../../reducers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _pre = require('../../reducers/pre');

var _pre2 = _interopRequireDefault(_pre);

var _config = require('../../reducers/config');

var _config2 = _interopRequireDefault(_config);

var _serverContext = require('../../reducers/server-context');

var _serverContext2 = _interopRequireDefault(_serverContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoApp = (0, _redux.combineReducers)({
  todos: _todos2.default,
  visibilityFilter: _visibilityFilter2.default,
  auth: _auth2.default,
  pre: _pre2.default,
  config: _config2.default,
  serverContext: _serverContext2.default
});

exports.default = todoApp;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map