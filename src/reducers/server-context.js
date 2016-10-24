const serverContext = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SERVER_CONTEXT':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default serverContext
