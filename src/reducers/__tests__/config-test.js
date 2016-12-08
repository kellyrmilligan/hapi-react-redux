/* global describe, it, expect */
import config from '../config'

describe('config reducer', () => {
  it('will return default state if no action type matches', () => {
    expect(config({
      newRelic: 123
    }, {}))
    .toEqual({
      newRelic: 123
    })
  })

  it('will set a new value if the action is dispatched', () => {
    expect(config({
      newRelic: 123
    }, {
      payload: {
        segment: 456
      },
      type: 'SET_CONFIG'
    }))
    .toEqual({
      newRelic: 123,
      segment: 456
    })
  })
})
