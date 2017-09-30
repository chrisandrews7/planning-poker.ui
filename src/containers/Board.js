import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVote } from '../actions/user';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import voteOptions from '../constants/voting';

export const mapStateToProps = state => ({
  players: state.get('players').toJS(),
  gameId: state.getIn(['game', 'id'])
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ setVote }, dispatch);

export class Board extends Component {
  static propTypes = {
    players: PropTypes.shape({
      name: PropTypes.string,
      vote: PropTypes.string
    }),
    gameId: PropTypes.number,
    setVote: PropTypes.func.isRequired
  }

  static defaultProps = {
    gameId: undefined,
    players: {}
  }

  onVote = (vote) => {
    this.props.setVote(vote);
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
