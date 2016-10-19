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

var _connectToStores = require('alt-utils/lib/connectToStores');

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _testActions = require('./test-actions');

var _testActions2 = _interopRequireDefault(_testActions);

var _testStore = require('./test-store');

var _testStore2 = _interopRequireDefault(_testStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StatefulHome = (0, _connectToStores2.default)(function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    (0, _classCallCheck3.default)(this, Home);
    return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  (0, _createClass3.default)(Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'home'
        ),
        _react2.default.createElement(
          'p',
          null,
          this.props.testValue
        )
      );
    }
  }], [{
    key: 'getStores',
    value: function getStores() {
      return [_testStore2.default];
    }
  }, {
    key: 'getPropsFromStores',
    value: function getPropsFromStores(props) {
      return {
        testValue: _testStore2.default.getState().value
      };
    }
  }]);
  return Home;
}(_react.Component));

StatefulHome.fetch = function () {
  return new Promise(function (resolve, reject) {
    _testActions2.default.setValue('testfetchValue');
    return resolve();
  });
};

exports.default = StatefulHome;
module.exports = exports['default'];
//# sourceMappingURL=home.js.map