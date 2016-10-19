import React, { Component } from 'react'

export default class App extends Component {

  static contextTypes = {
    config: React.PropTypes.object,
    pre: React.PropTypes.object,
    serverContext: React.PropTypes.object,
  }

  render() {
    return (
      <div>
        <h1>app</h1>
        {this.context.config.honeybadger}
        {this.context.serverContext.test && this.context.serverContext.test}
        {this.context.pre.preTest && this.context.pre.preTest}
        {this.props.children}
      </div>
    )
  }
}
