import React from 'react';
import Gameboard from '../components/Gameboard';
import Voter from '../components/Voter';
import VoteOptions from '../../shared/constants/voting';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Voter options={VoteOptions} onVote={() => {}} />
        <Gameboard players={this.state.players} />
      </div>
    );
  }
}
