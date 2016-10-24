'use strict';

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('config reducer', function () {
  it('will return default state if no action type matches', function () {
    expect((0, _config2.default)({
      newRelic: 123
    }, {})).toEqual({
      newRelic: 123
    });
  });

  it('will set a new value if the action is dispatched', function () {
    expect((0, _config2.default)({
      newRelic: 123
    }, {
      payload: {
        segment: 456
      },
      type: 'SET_CONFIG'
    })).toEqual({
      newRelic: 123,
      segment: 456
    });
  });
});
//# sourceMappingURL=config-test.js.map