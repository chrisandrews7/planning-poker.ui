import React from 'react';
import Gameboard from './Gameboard';
import Voter from './Voter';
import VoteOptions from '../../shared/constants/voting';

export default class App extends React.Component {
  onVote() {
  }

  render() {
    const players = [{
      name: 'Mr Test',
      vote: 11
    }, {
      name: 'Mr Robot',
      vote: 5
    }];

    return (
      <div>
        <Voter options={VoteOptions} onVote={this.onVote} />
        <Gameboard players={players} />
      </div>
    );
  }
}
