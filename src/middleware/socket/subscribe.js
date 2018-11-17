import { each } from 'lodash';
import { newPlayer, playerVote, removePlayer } from '../../actions/players';
import { loadingSocket, connectSocket } from '../../actions/user';
import {
  PLAYER_JOINED,
  PLAYER_VOTED,
  PLAYER_LEFT,
  GAME_UPDATED,
  RECONNECTING,
  CONNECTED
} from '../../constants/eventTypes';

export default (socket, dispatch) => {
  socket.on(GAME_UPDATED, ({ game }) => {
    dispatch(connectSocket());

    each(game, ({ vote, name }, id) => {
      if (id === socket.id) {
        return;
      }
      dispatch(newPlayer({
        id,
        name,
        vote
      }));
    });
  });

  socket.on(PLAYER_JOINED, ({ id, name }) => dispatch(newPlayer({
    id,
    name
  })));

  socket.on(PLAYER_VOTED, ({ id, vote }) => dispatch(playerVote({
    id,
    vote
  })));

  socket.on(PLAYER_LEFT, ({ id }) => dispatch(removePlayer({
    id
  })));

  socket.on(RECONNECTING, () => dispatch(loadingSocket()));

  socket.on(CONNECTED, () => dispatch(connectSocket()));
};
