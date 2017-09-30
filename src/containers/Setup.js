import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/user';
import { setRandomGame, setGame, join } from '../actions/game';
import { ENTER_NAME, ENTER_GAME } from '../constants/dictionary';

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ setRandomGame, setUser, setGame, join }, dispatch);

export const mapStateToProps = state => ({
  name: state.getIn(['user', 'name']),
  gameId: state.getIn(['game', 'id'])
});

export class Setup extends Component {
  static propTypes = {
    setRandomGame: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setGame: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    name: PropTypes.string,
    gameId: PropTypes.number
  }

  static defaultProps = {
    name: undefined,
    gameId: undefined
  }

  joinGame = () => {
    this.props.join(this.props.gameId, this.props.name);
  }

  render() {
    return (
      <div>
        <h1>Setup</h1>
        <button
          className="setup__random-game"
          onClick={this.props.setRandomGame}
        >
          Create New Game
        </button>
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
        <button
          className="setup__join"
          onClick={this.joinGame}
        >
          Join
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
