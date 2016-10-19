import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import Home from './home'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
)

export default routes
