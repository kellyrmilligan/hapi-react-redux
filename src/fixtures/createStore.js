import rootReducer from 'fixtures/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
export default function() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunk
    )
  )
}
