import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVote } from '../actions/user';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import Results from '../components/Results';
import voteOptions from '../constants/voting';
import { selectAllPlayers } from '../selectors/players';
import { SHARE_LINK, GAME } from '../constants/dictionary';

export const mapStateToProps = state => ({
  players: selectAllPlayers(state),
  gameId: state.getIn(['game', 'gameId']),
  allVoted: state.getIn(['game', 'allVoted'])
});

export const mapDispatchToProps = dispatch => bindActionCreators({ setVote }, dispatch);

export class Board extends Component {
  static propTypes = {
    players: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      vote: PropTypes.string
    }).isRequired,
    gameId: PropTypes.string,
    setVote: PropTypes.func.isRequired,
    allVoted: PropTypes.bool.isRequired
  }

  static defaultProps = {
    gameId: undefined
  }

  render() {
    const { players, gameId, allVoted } = this.props;
    return (
      <div className="row">
        <div className="col-md-7">
          <VotePanel
            options={voteOptions}
            onVote={vote => this.props.setVote(vote)}
          />
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-header bg-info">
              <h4 className="text-white">
                {`${GAME}: `}
                <span className="font-weight-light">{gameId}</span>
              </h4>
            </div>
            {allVoted ? (
              <div className="card-body">
                <Results results={map(players, ({ vote }) => vote)} />
              </div>)
              : <PlayerList players={players} />}
            <div className="card-footer text-muted text-center">
              {`${SHARE_LINK}: `}
              <a href={window.location.href}>{window.location.href}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
