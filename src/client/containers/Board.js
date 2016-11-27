import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../actions/players';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import VoteOptions from '../../shared/constants/voting';

const mapStateToProps = state => ({
  players: state.get('players').toJS()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class Board extends Component {
  static propTypes = {
    players: PropTypes.object,
    params: PropTypes.object
  }

  render() {
    const { players, params } = this.props;
    return (
      <div>
        Room: {params.boardId}
        <VotePanel
          options={VoteOptions}
          onVote={() => {}}
        />
        <PlayerList players={players} />
      </div>
    );
  }
}
