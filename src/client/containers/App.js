import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Gameboard from '../components/Gameboard';
import Voter from '../components/Voter';
import VoteOptions from '../../shared/constants/voting';

class App extends Component {
  static propTypes = {
    players: PropTypes.object.isRequired
  }

  render() {
    const { players } = this.props;
    return (
      <div>
        <Voter options={VoteOptions} onVote={() => {}} />
        <Gameboard players={players} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  players: state.players
});

export default connect(mapStateToProps)(App);
