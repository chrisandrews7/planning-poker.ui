import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateVote } from '../actions/players';
import { setGame } from '../actions/user';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import voteOptions from '../constants/voting';

export const mapStateToProps = state => ({
  players: state.get('players').toJS(),
  user: state.getIn(['user', 'name']),
  gameId: state.getIn(['user', 'gameId'])
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ setGame, updateVote }, dispatch);

export class Board extends Component {
  static propTypes = {
    players: PropTypes.shape({
      name: PropTypes.string,
      vote: PropTypes.string
    }),
    gameId: PropTypes.number,
    user: PropTypes.string.isRequired,
    updateVote: PropTypes.func.isRequired,
    setGame: PropTypes.func.isRequired,
    params: PropTypes.shape({
      gameId: PropTypes.number
    }).isRequired
  }

  static defaultProps = {
    gameId: undefined,
    players: {}
  }

  componentWillMount() {
    if (!this.props.gameId) {
      this.props.setGame(this.props.params.gameId);
    }
  }

  onVote = (args) => {
    this.props.updateVote(this.props.user, ...args);
  }

  render() {
    const { players, gameId } = this.props;
    return (
      <div>
        <h1>Game: {gameId}</h1>
        <VotePanel
          options={voteOptions}
          onVote={this.onVote}
        />
        <PlayerList players={players} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
