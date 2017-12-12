import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinContainer from '../containers/Join';
import BoardContainer from '../containers/Board';

export const mapStateToProps = state => ({
  loading: state.getIn(['user', 'loading'])
});

export class Game extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  render() {
    if (this.props.loading === true) {
      return <BoardContainer {...this.props} />;
    }

    return <JoinContainer {...this.props} />;
  }
}

export default connect(mapStateToProps)(Game);
