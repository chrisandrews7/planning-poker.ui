import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVote } from '../actions/user';
import { resetVotes } from '../actions/game';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import Results from '../components/Results';
import voteOptions from '../constants/voting';
import { selectAllPlayers } from '../selectors/players';
import { SHARE_LINK, GAME, RESET_VOTES } from '../constants/dictionary';

export const mapStateToProps = state => ({
  players: selectAllPlayers(state),
  gameId: state.getIn(['game', 'gameId']),
  allVoted: state.getIn(['game', 'allVoted']),
  vote: state.getIn(['user', 'vote'])
});

export const mapDispatchToProps = dispatch => bindActionCreators({ setVote, resetVotes }, dispatch);

export class Board extends Component {
  static propTypes = {
    players: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      vote: PropTypes.string
    }).isRequired,
    gameId: PropTypes.string,
    allVoted: PropTypes.bool.isRequired,
    vote: PropTypes.string,
    setVote: PropTypes.func.isRequired,
    resetVotes: PropTypes.func.isRequired
  }

  static defaultProps = {
    gameId: undefined,
    vote: undefined
  }

  render() {
    const {
      players, gameId, allVoted, vote
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-7">
          <VotePanel
            options={voteOptions}
            onVote={value => this.props.setVote(value)}
            selectedValue={vote}
          />
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-header bg-info">
              <button
                type="button"
                className="btn btn-outline-light float-right"
                onClick={this.props.resetVotes}
              >
                {RESET_VOTES}
              </button>
              <h4 className="text-white">
                {`${GAME}: `}
                <span className="font-weight-light">{gameId}</span>
              </h4>
            </div>
            {allVoted ? (
              <div className="card-body">
                <Results results={map(players, ({ vote: v }) => v)} />
              </div>
            )
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
