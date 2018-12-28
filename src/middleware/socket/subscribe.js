import {
  setConnectionLost, setGameJoined, joinGame, updateBoard
} from '../../actions/game';
import {
  BOARD_UPDATED,
  JOINED_GAME,
  RECONNECTING,
  RECONNECTED
} from '../../constants/eventTypes';

export default (socket, dispatch) => {
  socket.on(BOARD_UPDATED, ({ board }) => dispatch(updateBoard(board)));

  socket.on(JOINED_GAME, () => dispatch(setGameJoined()));

  socket.on(RECONNECTING, () => dispatch(setConnectionLost()));

  socket.on(RECONNECTED, () => dispatch(joinGame()));
};
