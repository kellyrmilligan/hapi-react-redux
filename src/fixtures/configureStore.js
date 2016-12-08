import rootReducer from 'fixtures/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
export default function (preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunk
    )
  )
}
