import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'

import TodoApp from './TodoApp'

class App extends Component {
  render () {
    return (
      <div>
        <h1>app</h1>
        <TodoApp />
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

export default withRouter(App)
