import { Map } from 'immutable';
import { ADD_PLAYER } from '../constants/actionTypes';

export default function players(state = Map(), action) {
  switch (action.type) {
    case ADD_PLAYER:
      return state.set(action.name, Map({
        name: action.name,
        vote: action.vote
      }));
    default:
      return state;
  }
}
