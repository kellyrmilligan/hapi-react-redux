import React, { Component } from 'react'
import { Provider } from 'react-redux'
import TodoApp from './TodoApp'

export default class App extends Component {

  static contextTypes = {
    config: React.PropTypes.object,
    pre: React.PropTypes.object,
    serverContext: React.PropTypes.object,
    store: React.PropTypes.object
  }

  render() {
    return (
      <div>
        <h1>app</h1>
        {this.context.config.honeybadger}
        {this.context.serverContext.test && this.context.serverContext.test}
        {this.context.pre.preTest && this.context.pre.preTest}
        {this.props.children}
        <Provider store={this.context.store} >
          <TodoApp />
        </Provider>
      </div>
    )
  }
}
