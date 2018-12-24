import { Map } from 'immutable';
import {
  JOINING_GAME,
  USER_VOTED,
  JOINED_GAME,
  CONNECTION_LOST
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
    case JOINING_GAME:
      return state
        .set('loading', true)
        .set('gameId', action.payload.gameId)
        .set('name', action.payload.name);
    case CONNECTION_LOST:
      return state.set('loading', true);
    case JOINED_GAME:
      return state.set('loading', false);
    default:
      return state;
  }
}
