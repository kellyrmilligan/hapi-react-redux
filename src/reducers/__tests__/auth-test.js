/* global describe, it, expect */
import auth from '../auth'

describe('auth reducer', () => {
  it('will return default state if no action type matches', () => {
    expect(auth({ isAuthenticated: false }, {})).toEqual({ isAuthenticated: false })
  })

  it('will set a new value if the action is dispatched', () => {
    expect(auth({
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
    })
  })
})
