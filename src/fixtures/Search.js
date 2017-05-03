import React, { Component } from 'react'
import { asyncAddTodo } from './actions'

export default class Search extends Component {
  static fetch (match, location, { dispatch }) {
    return dispatch(asyncAddTodo(location.search))
  }

  render () {
    return (
      <main>
        <h2>Search</h2>
      </main>
    )
  }
}
