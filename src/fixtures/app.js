import React, { Component } from 'react'
import TodoApp from './TodoApp'

export default class App extends Component {

  render () {
    return (
      <div>
        <h1>app</h1>
        <TodoApp />
        {this.props.children}
      </div>
    )
  }
}
