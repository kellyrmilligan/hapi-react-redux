const config = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default config
