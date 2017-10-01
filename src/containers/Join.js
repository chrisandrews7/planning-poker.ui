import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/user';
import { setGame, join } from '../actions/game';
import { ENTER_NAME } from '../constants/dictionary';

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ setUser, setGame, join }, dispatch);

export const mapStateToProps = state => ({
  name: state.getIn(['user', 'name']),
  gameId: state.getIn(['game', 'id'])
});

export class Join extends Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired,
    setGame: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    name: PropTypes.string,
    gameId: PropTypes.number,
    params: PropTypes.shape({
      gameId: PropTypes.number
    }).isRequired
  }

  static defaultProps = {
    name: undefined,
    gameId: undefined
  }

  componentDidMount() {
    if (this.props.params.gameId) {
      this.props.setGame(this.props.params.gameId);
    }
  }

  joinGame = () => {
    this.props.join(this.props.gameId, this.props.name);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder={ENTER_NAME}
          value={this.props.name}
          onChange={event => this.props.setUser(event.target.value)}
        />
        <button
          onClick={this.joinGame}
        >
          Join
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);
