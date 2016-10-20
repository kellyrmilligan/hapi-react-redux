const auth = (state = {}, action) => {
  switch (action.type) {
    case 'auth':
      return Object.assign({}, state, {auth: action.auth})
    default:
      return state
  }
}

export default auth
