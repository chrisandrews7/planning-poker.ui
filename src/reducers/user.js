import { Map } from 'immutable';
import {
  USER_JOINED_GAME,
  USER_VOTED
} from '../constants/actionTypes';

const initialState = Map({
  name: undefined,
  vote: undefined,
  gameId: undefined
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_VOTED:
      return state.set('vote', action.payload.vote);
    case USER_JOINED_GAME:
      return state
        .set('gameId', action.payload.gameId)
        .set('name', action.payload.name);
    default:
      return state;
  }
}
