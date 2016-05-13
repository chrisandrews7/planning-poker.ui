import React from 'react';
import Gameboard from '../components/Gameboard';
import Voter from '../components/Voter';
import VoteOptions from '../../shared/constants/voting';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [{
        name: 'Me',
        vote: 11
      }, {
        name: 'Someone else',
        vote: 5
      }]
    };
  }

  onVote(vote) {
    const players = this.state.players;
    players[0].vote = vote;
    this.setState({
      players
    });
  }

  render() {
    return (
      <div>
        <Voter options={VoteOptions} onVote={::this.onVote} />
        <Gameboard players={this.state.players} />
      </div>
    );
  }
}
