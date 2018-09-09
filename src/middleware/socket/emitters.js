import { VOTE, JOIN } from '../../constants/eventTypes';
import {
  USER_JOINED_GAME,
  USER_VOTED
} from '../../constants/actionTypes';

export default socket => () => next => (action) => {
  switch (action.type) {
    case USER_JOINED_GAME:
      socket.emit(JOIN, {
        name: action.payload.name,
        gameId: action.payload.gameId
      });
      break;
    case USER_VOTED:
      socket.emit(VOTE, {
        vote: action.payload.vote
      });
      break;
    default:
      break;
  }
  return next(action);
};
