import { each } from 'lodash';
import { updatePlayer, removePlayer } from '../../actions/players';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  VOTE_UPDATED,
  CONNECT
} from '../../constants/eventTypes';

export default (socket, dispatch) => {
  socket.on(CONNECT, ({ votes }) =>
    each(votes, (vote, player) => {
      dispatch(updatePlayer(player, vote));
    }));

  socket.on(PLAYER_JOINED, ({ playerId }) =>
    dispatch(updatePlayer(playerId)));

  socket.on(PLAYER_LEFT, ({ playerId }) =>
    dispatch(removePlayer(playerId)));

  socket.on(VOTE_UPDATED, ({ playerId, vote }) =>
    dispatch(updatePlayer(playerId, vote)));
};
