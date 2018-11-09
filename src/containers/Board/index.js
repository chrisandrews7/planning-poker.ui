import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVote } from '../../actions/user';
import PlayerList from '../../components/PlayerList';
import VotePanel from '../../components/VotePanel';
import voteOptions from '../../constants/voting';
import { selectAllPlayers } from '../../selectors/players';
import './styles.less';

export const mapStateToProps = state => ({
  players: selectAllPlayers(state),
  gameId: state.getIn(['user', 'gameId'])
});

export const mapDispatchToProps = dispatch => bindActionCreators({ setVote }, dispatch);

export class Board extends Component {
  static propTypes = {
    players: PropTypes.shape({
      name: PropTypes.string,
      vote: PropTypes.string
    }),
    gameId: PropTypes.string,
    setVote: PropTypes.func.isRequired
  }

  static defaultProps = {
    gameId: undefined,
    players: {}
  }

  render() {
    const { players, gameId } = this.props;
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
                {'Game: '}
                <span className="font-weight-light">{gameId}</span>
              </h4>
            </div>
            <PlayerList players={players} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
