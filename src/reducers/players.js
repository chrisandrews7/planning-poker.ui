import { Map } from 'immutable';
import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_VOTE, SET_USER } from '../constants/actionTypes';

const initialState = Map();

export default function players(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
    case SET_USER:
      return state.set(action.name, Map({
        name: action.name,
        vote: action.vote
      }));
    case REMOVE_PLAYER:
      return state.delete(action.name);
    case UPDATE_VOTE:
      return state.setIn([action.name, 'vote'], action.vote);
    default:
      return state;
  }
}
