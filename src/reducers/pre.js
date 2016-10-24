const pre = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PRE':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default pre
