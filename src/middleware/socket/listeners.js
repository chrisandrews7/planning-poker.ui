import { each } from 'lodash';
import { updateVote, removePlayer } from '../../actions/players';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  VOTE_UPDATED,
  CONNECT
} from '../../constants/eventTypes';

export default (socket, dispatch) => {
  socket.on(CONNECT, ({ votes }) =>
    each(votes, (vote, player) => {
      dispatch(updateVote(player, vote));
    }));

  socket.on(PLAYER_JOINED, ({ playerId }) =>
    dispatch(updateVote(playerId)));

  socket.on(PLAYER_LEFT, ({ playerId }) =>
    dispatch(removePlayer(playerId)));

  socket.on(VOTE_UPDATED, ({ playerId, vote }) =>
    dispatch(updateVote(playerId, vote)));
};
