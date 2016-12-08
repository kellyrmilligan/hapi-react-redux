/* global describe, it, expect */
import pre from '../pre'

describe('pre reducer', () => {
  it('will return default state if no action type matches', () => {
    expect(pre({
      device: { phone: true }
    }, {}))
    .toEqual({
      device: { phone: true }
    })
  })

  it('will set a new value if the action is dispatched', () => {
    expect(pre({
      device: { phone: true }
    }, {
      payload: {
        device: { phone: true, iOS: false }
      },
      type: 'SET_PRE'
    }))
    .toEqual({
      device: { phone: true, iOS: false }
    })
  })
})
