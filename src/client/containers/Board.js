import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateVote } from '../actions/players';
import { setGame } from '../actions/user';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import VoteOptions from '../../shared/constants/voting';

export const mapStateToProps = state => ({
  players: state.get('players').toJS(),
  user: state.getIn(['user', 'name']),
  gameId: state.getIn(['user', 'gameId'])
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateVote, setGame }, dispatch);

export class Board extends Component {
  static propTypes = {
    players: PropTypes.object,
    gameId: PropTypes.number,
    user: PropTypes.string,
    updateVote: PropTypes.func,
    setGame: PropTypes.func,
    params: PropTypes.object
  }

  componentWillMount() {
    if (!this.props.gameId) {
      this.props.setGame(this.props.params.gameId);
    }
  }

  render() {
    const { players, gameId, user, updateVote } = this.props;
    return (
      <div>
        <h1>Game: {gameId}</h1>
        <VotePanel
          options={VoteOptions}
          onVote={updateVote.bind(null, user)}
        />
        <PlayerList players={players} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
