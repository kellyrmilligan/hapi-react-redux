'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _alt = require('./alt');

var _alt2 = _interopRequireDefault(_alt);

var _testActions = require('./test-actions');

var _testActions2 = _interopRequireDefault(_testActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestStore = function () {
  function TestStore() {
    (0, _classCallCheck3.default)(this, TestStore);

    this.bindActions(_testActions2.default);
  }

  (0, _createClass3.default)(TestStore, [{
    key: 'onSetValue',
    value: function onSetValue(value) {
      this.setState({
        value: value
      });
    }
  }]);
  return TestStore;
}();

exports.default = _alt2.default.createStore(TestStore);
module.exports = exports['default'];
//# sourceMappingURL=test-store.js.map