import { Map } from 'immutable';
import {
  JOINING_GAME,
  USER_VOTED,
  JOINED_GAME,
  CONNECTION_LOST,
  USER_UPDATED
} from '../constants/actionTypes';

const initialState = Map({
  name: undefined,
  vote: undefined,
  gameId: undefined,
  loading: false
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_VOTED:
      return state.set('vote', action.payload.vote);
    case USER_UPDATED:
      return state
        .set('gameId', action.payload.gameId)
        .set('name', action.payload.name);
    case CONNECTION_LOST:
    case JOINING_GAME:
      return state.set('loading', true);
    case JOINED_GAME:
      return state.set('loading', false);
    default:
      return state;
  }
}
