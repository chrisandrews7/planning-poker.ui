import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../actions/players';
import Gameboard from '../components/Gameboard';
import VotePanel from '../components/VotePanel';
import VoteOptions from '../../shared/constants/voting';
import faker from 'faker';

const mapStateToProps = state => ({
  players: state.get('players').toJS()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    players: PropTypes.object.isRequired,
    addPlayer: PropTypes.func.isRequired
  }

  render() {
    const { players, addPlayer } = this.props;
    return (
      <div>
        <VotePanel
          options={VoteOptions}
          onVote={addPlayer.bind(null, faker.name.firstName())}
        />
        <Gameboard players={players} />
      </div>
    );
  }
}
