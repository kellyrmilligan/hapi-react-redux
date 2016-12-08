import React, { Component } from 'react'
import { asyncAddTodo } from './actions'

export default class Home extends Component {

  static fetch (params, query, { dispatch }) {
    return dispatch(asyncAddTodo('test-todo-redux'))
  }

  render () {
    return (
      <main>
        <h2>home</h2>
      </main>
    )
  }
}
