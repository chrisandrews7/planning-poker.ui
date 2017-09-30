import { Map } from 'immutable';
import { SET_USER, SET_VOTE } from '../constants/actionTypes';

const initialState = Map({
  name: undefined,
  vote: undefined
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set('name', action.payload.name);
    case SET_VOTE:
      return state.set('vote', action.payload.vote);
    default:
      return state;
  }
}
