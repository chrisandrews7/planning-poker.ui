import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../actions/players';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import VoteOptions from '../../shared/constants/voting';
import faker from 'faker';

const mapStateToProps = state => ({
  players: state.get('players').toJS()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class Board extends Component {
  static propTypes = {
    players: PropTypes.object.isRequired,
    addPlayer: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  render() {
    const { players, addPlayer, params } = this.props;
    return (
      <div>
        Room: {params.boardId}
        <VotePanel
          options={VoteOptions}
          onVote={addPlayer.bind(null, faker.name.firstName())}
        />
        <PlayerList players={players} />
      </div>
    );
  }
}
