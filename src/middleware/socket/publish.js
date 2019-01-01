import { VOTE, JOIN } from '../../constants/eventTypes';
import {
  JOINING_GAME,
  USER_VOTED,
  LEFT_GAME
} from '../../constants/actionTypes';

export default socket => store => next => (action) => {
  switch (action.type) {
    case JOINING_GAME:
      socket.connect();

      const state = store.getState();
      socket.emit(JOIN, {
        name: state.getIn(['user', 'name']),
        gameId: state.getIn(['game', 'gameId'])
      });
      break;
    case LEFT_GAME:
      socket.close();
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
