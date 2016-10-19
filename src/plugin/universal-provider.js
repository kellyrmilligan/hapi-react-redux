import React, { PropTypes, Component } from 'react'

class UniversalProvider extends Component {

  static childContextTypes = {
    config: PropTypes.object,
    pre: PropTypes.object,
    serverContext: PropTypes.object,
  }

  getChildContext() {
    return {
      config: this.props.config,
      pre: this.props.config,
      serverContext: this.props.config,
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default UniversalProvider
