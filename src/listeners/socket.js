import { addPlayer, updateVote, removePlayer } from '../actions/players';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  VOTE_UPDATED
} from '../constants/eventTypes';

export default (socket, dispatch) => {
  socket.on(PLAYER_JOINED, ({ playerId }) =>
    dispatch(addPlayer(playerId)));

  socket.on(PLAYER_LEFT, ({ playerId }) =>
    dispatch(removePlayer(playerId)));

  socket.on(VOTE_UPDATED, ({ playerId, vote }) =>
    dispatch(updateVote(playerId, vote)));
};
