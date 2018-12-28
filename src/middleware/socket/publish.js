import { VOTE, JOIN } from '../../constants/eventTypes';
import {
  JOINING_GAME,
  USER_VOTED
} from '../../constants/actionTypes';

export default socket => store => next => (action) => {
  switch (action.type) {
    case JOINING_GAME:
      const state = store.getState();
      socket.emit(JOIN, {
        name: state.getIn(['user', 'name']),
        gameId: state.getIn(['user', 'gameId'])
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
