/* global describe, it, expect */
import serverContext from '../server-context'

describe('server context reducer', () => {
  it('will return default state if no action type matches', () => {
    expect(serverContext({
      trunks: {
        id: 123
      }
    }, {}))
    .toEqual({
      trunks: {
        id: 123
      }
    })
  })

  it('will set a new value if the action is dispatched', () => {
    expect(serverContext({
      trunks: {
        id: 123
      }
    }, {
      payload: {
        trunks: {
          id: 123,
          feedbacks: [
            {
              id: 456,
              comment: 'loved it'
            }
          ]
        }
      },
      type: 'SET_SERVER_CONTEXT'
    }))
    .toEqual({
      trunks: {
        id: 123,
        feedbacks: [
          {
            id: 456,
            comment: 'loved it'
          }
        ]
      }
    })
  })
})
