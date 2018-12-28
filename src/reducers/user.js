import { Map } from 'immutable';
import {
  USER_VOTED,
  NAME_UPDATED
} from '../constants/actionTypes';

const initialState = Map({
  name: undefined,
  vote: undefined
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_VOTED:
      return state.set('vote', action.payload.vote);
    case NAME_UPDATED:
      return state.set('name', action.payload.name);
    default:
      return state;
  }
}
