import { Map } from 'immutable';
import {
  USER_VOTED,
  NAME_UPDATED,
  ONLY_OBSERVING
} from '../constants/actionTypes';

const initialState = Map({
  name: undefined,
  vote: undefined,
  isObserver: false
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_VOTED:
      return state.set('vote', action.payload.vote);
    case NAME_UPDATED:
      return state.set('name', action.payload.name);
    case ONLY_OBSERVING:
      return state.set('isObserver', true);
    default:
      return state;
  }
}
