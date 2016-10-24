'use strict';

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('auth reducer', function () {
  it('will return default state if no action type matches', function () {
    expect((0, _auth2.default)({ isAuthenticated: false }, {})).toEqual({ isAuthenticated: false });
  });

  it('will set a new value if the action is dispatched', function () {
    expect((0, _auth2.default)({
      isAuthenticated: false
    }, {
      payload: {
        isAuthenticated: true,
        userId: 123
      },
      type: 'SET_AUTH'
    })).toEqual({
      isAuthenticated: true,
      userId: 123
    });
  });
});
//# sourceMappingURL=auth-test.js.map