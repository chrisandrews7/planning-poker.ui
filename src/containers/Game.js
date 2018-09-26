import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinContainer from './Join';
import BoardContainer from './Board/index';

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
      return (
        <div className="container">
          <BoardContainer {...this.props} />
        </div>
      );
    }

    return (
      <div className="container">
        <JoinContainer {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);
