import { VOTE, JOIN } from '../../constants/eventTypes';
import {
  JOINING_GAME,
  USER_VOTED
} from '../../constants/actionTypes';

export default socket => () => next => (action) => {
  switch (action.type) {
    case JOINING_GAME:
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
