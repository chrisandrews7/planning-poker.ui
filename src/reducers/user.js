import { Map } from 'immutable';
import {
  USER_JOINING_GAME,
  USER_VOTED,
  SOCKET_LOADING,
  SOCKET_CONNECTED
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
    case USER_JOINING_GAME:
      return state
        .set('loading', true)
        .set('gameId', action.payload.gameId)
        .set('name', action.payload.name);
    case SOCKET_LOADING:
      return state.set('loading', true);
    case SOCKET_CONNECTED:
      return state.set('loading', false);
    default:
      return state;
  }
}
