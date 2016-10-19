import alt from './alt'
import testActions from './test-actions'

class TestStore {
  constructor() {
    this.bindActions(testActions)
  }

  onSetValue(value) {
    this.setState({
      value: value
    })
  }
}

export default alt.createStore(TestStore)
