'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _Link = require('../components/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: function onClick() {
      dispatch((0, _actions.setVisibilityFilter)(ownProps.filter));
    }
  };
};

var FilterLink = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Link2.default);

exports.default = FilterLink;
module.exports = exports['default'];
//# sourceMappingURL=FilterLink.js.map