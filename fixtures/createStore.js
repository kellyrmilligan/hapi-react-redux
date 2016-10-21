'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (preloadedState) {
  return (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
};

var _reducers = require('fixtures/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
//# sourceMappingURL=createStore.js.map