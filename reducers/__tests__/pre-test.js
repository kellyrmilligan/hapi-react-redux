'use strict';

var _pre = require('../pre');

var _pre2 = _interopRequireDefault(_pre);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('pre reducer', function () {
  it('will return default state if no action type matches', function () {
    expect((0, _pre2.default)({
      device: { phone: true }
    }, {})).toEqual({
      device: { phone: true }
    });
  });

  it('will set a new value if the action is dispatched', function () {
    expect((0, _pre2.default)({
      device: { phone: true }
    }, {
      payload: {
        device: { phone: true, iOS: false }
      },
      type: 'SET_PRE'
    })).toEqual({
      device: { phone: true, iOS: false }
    });
  });
});
//# sourceMappingURL=pre-test.js.map