import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import auth from './auth'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  auth
})

export default todoApp
