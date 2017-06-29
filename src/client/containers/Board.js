import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../actions/players';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import VoteOptions from '../../shared/constants/voting';

export const mapStateToProps = state => ({
  players: state.get('players').toJS(),
  user: state.getIn(['user', 'name']),
  room: state.getIn(['user', 'room'])
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(playerActions, dispatch);

export class Board extends Component {
  static propTypes = {
    players: PropTypes.object,
    room: PropTypes.string,
    user: PropTypes.string,
    updateVote: PropTypes.func
  }

  render() {
    const { players, room, user, updateVote } = this.props;
    return (
      <div>
        <h1>Room: {room}</h1>
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
