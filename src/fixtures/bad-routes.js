import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './Root'

class BadComponent extends React.Component {

  render () {
    // return (
    //   <main>
    //     <h2>home</h2>
    //   </main>
    // )
  }
}

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={BadComponent} />
  </Route>
)

export default routes
