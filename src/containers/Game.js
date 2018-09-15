import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinContainer from './Join';
import BoardContainer from './Board';

export const mapStateToProps = state => ({
  gameId: state.getIn(['user', 'gameId'])
});

export class Game extends Component {
  static propTypes = {
    gameId: PropTypes.string
  }

  static defaultProps = {
    gameId: undefined
  }

  render() {
    if (this.props.gameId) {
      return <BoardContainer {...this.props} />;
    }

    return <JoinContainer {...this.props} />;
  }
}

export default connect(mapStateToProps)(Game);
