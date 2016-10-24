const auth = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default auth
