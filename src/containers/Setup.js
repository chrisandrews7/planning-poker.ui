import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startNewGame, setUser, setGame } from '../actions/user';
import { ENTER_NAME, ENTER_GAME } from '../constants/dictionary';

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ startNewGame, setUser, setGame }, dispatch);

export const mapStateToProps = state => ({
  name: state.getIn(['user', 'name']),
  gameId: state.getIn(['user', 'gameId'])
});

export class Setup extends Component {
  static propTypes = {
    startNewGame: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setGame: PropTypes.func.isRequired,
    name: PropTypes.string,
    gameId: PropTypes.number
  }

  static defaultProps = {
    name: undefined,
    gameId: undefined
  }

  render() {
    return (
      <div>
        <h1>Setup</h1>
        <button onClick={this.props.startNewGame}>Create New Game</button>
        <input
          type="text"
          placeholder={ENTER_NAME}
          name="user"
          value={this.props.name}
          onChange={event => this.props.setUser(event.target.value)}
        />
        <input
          type="text"
          placeholder={ENTER_GAME}
          name="gameId"
          value={this.props.gameId}
          onChange={event => this.props.setGame(event.target.value)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
