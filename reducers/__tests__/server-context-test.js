'use strict';

var _serverContext = require('../server-context');

var _serverContext2 = _interopRequireDefault(_serverContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('server context reducer', function () {
  it('will return default state if no action type matches', function () {
    expect((0, _serverContext2.default)({
      trunks: {
        id: 123
      }
    }, {})).toEqual({
      trunks: {
        id: 123
      }
    });
  });

  it('will set a new value if the action is dispatched', function () {
    expect((0, _serverContext2.default)({
      trunks: {
        id: 123
      }
    }, {
      payload: {
        trunks: {
          id: 123,
          feedbacks: [{
            id: 456,
            comment: 'loved it'
          }]
        }
      },
      type: 'SET_SERVER_CONTEXT'
    })).toEqual({
      trunks: {
        id: 123,
        feedbacks: [{
          id: 456,
          comment: 'loved it'
        }]
      }
    });
  });
});
//# sourceMappingURL=server-context-test.js.map