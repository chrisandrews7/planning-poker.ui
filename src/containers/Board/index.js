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
      <div>
        <div className="board-voting">
          <VotePanel
            options={voteOptions}
            onVote={vote => this.props.setVote(vote)}
          />
        </div>
        <div className="board-players">
          <div className="board-players__title">
            {'Game: '}
            {gameId}
          </div>
          <div className="board-players__list">
            <PlayerList players={players} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
