import React, { Component } from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'

import TestActions from './test-actions'
import TestStore from './test-store'

const StatefulHome = connectToStores(class Home extends Component {

  static getStores() {
    return [
      TestStore
    ]
  }

  static getPropsFromStores(props) {
    return {
      testValue: TestStore.getState().value
    }
  }

  render() {
    return (
      <main>
        <h2>home</h2>
        <p>{this.props.testValue}</p>
      </main>
    )
  }
})

StatefulHome.fetch = function() {
  return new Promise((resolve, reject) => {
    TestActions.setValue('testfetchValue')
    return resolve()
  })
}

export default StatefulHome
