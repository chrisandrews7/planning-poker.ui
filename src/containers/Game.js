import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JoinContainer from './Join';
import BoardContainer from './Board';
import { setGameId } from '../actions/game';
import { CONNECTION_ERROR } from '../constants/dictionary';

export const mapStateToProps = state => ({
  name: state.getIn(['user', 'name']),
  connected: state.getIn(['game', 'connected'])
});

export const mapDispatchToProps = dispatch => bindActionCreators({
  setGameId
}, dispatch);

export class Game extends Component {
  static propTypes = {
    name: PropTypes.string,
    connected: PropTypes.bool.isRequired,
    setGameId: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        gameId: PropTypes.string
      }).isRequired
    }).isRequired
  }

  static defaultProps = {
    name: undefined
  }

  componentDidMount() {
    this.props.setGameId(this.props.match.params.gameId);
  }

  render() {
    if (this.props.name) {
      return (
        <div className="container">
          {!this.props.connected && (
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
