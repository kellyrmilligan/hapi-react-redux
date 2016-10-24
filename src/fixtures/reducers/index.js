import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import auth from '../../reducers/auth'
import pre from '../../reducers/pre'
import config from '../../reducers/config'
import serverContext from '../../reducers/server-context'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  auth,
  pre,
  config,
  serverContext
})

export default todoApp
