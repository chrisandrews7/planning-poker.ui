import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlayerActions from '../actions/players';
import Gameboard from '../components/Gameboard';
import Voter from '../components/Voter';
import VoteOptions from '../../shared/constants/voting';
import faker from 'faker';

class App extends Component {
  static propTypes = {
    players: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  render() {
    const { players, actions } = this.props;
    return (
      <div>
        <Voter
          options={VoteOptions}
          onVote={actions.addPlayer.bind(null, faker.name.firstName())}
        />
        <Gameboard players={players} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.get('players').toJS()
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(PlayerActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
