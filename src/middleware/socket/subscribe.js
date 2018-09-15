import { each } from 'lodash';
import { newPlayer, playerVote, removePlayer } from '../../actions/players';
import {
  PLAYER_JOINED,
  PLAYER_VOTED,
  PLAYER_LEFT,
  GAME_UPDATED
} from '../../constants/eventTypes';

export default (socket, dispatch) => {
  socket.on(GAME_UPDATED, ({ game }) => {
    each(game, ({ vote, name }, id) => {
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
};
