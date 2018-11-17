import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinContainer from './Join';
import BoardContainer from './Board';
import { CONNECTION_ERROR } from '../constants/dictionary';

export const mapStateToProps = state => ({
  gameId: state.getIn(['user', 'gameId']),
  isLoading: state.getIn(['user', 'loading'])
});

export class Game extends Component {
  static propTypes = {
    gameId: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
  }

  static defaultProps = {
    gameId: undefined
  }

  render() {
    if (this.props.gameId) {
      return (
        <div className="container">
          {this.props.isLoading && (
            <div className="alert alert-danger" role="alert">
              {CONNECTION_ERROR}
            </div>
          )}
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
