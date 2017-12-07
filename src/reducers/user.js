import { Map } from 'immutable';
import {
  SET_USER,
  SET_VOTE,
  JOIN_GAME,
  SET_GAME
} from '../constants/actionTypes';

const initialState = Map({
  name: undefined,
  vote: undefined,
  gameId: undefined,
  loading: false
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set('name', action.payload.name);
    case SET_VOTE:
      return state.set('vote', action.payload.vote);
    case SET_GAME:
      return state.set('gameId', action.payload.gameId);
    case JOIN_GAME:
      return state.set('loading', true);
    default:
      return state;
  }
}
