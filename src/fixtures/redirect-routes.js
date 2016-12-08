import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './Root'
import Home from './Home'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='info' component={Home} />
    <Redirect from='about' to='info' />
  </Route>
)

export default routes
