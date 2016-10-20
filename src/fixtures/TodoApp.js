import React, { Component } from 'react'
import Footer from './components/Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'

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
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
  }
}
