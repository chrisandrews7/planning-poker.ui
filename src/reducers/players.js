import { Map } from 'immutable';
import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_VOTE } from '../constants/actionTypes';

const initialState = Map();

export default function players(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return state.set(action.payload.name, Map({
        name: action.payload.name,
        vote: action.payload.vote
      }));
    case REMOVE_PLAYER:
      return state.delete(action.payload.name);
    case UPDATE_VOTE:
      return state.setIn([action.payload.name, 'vote'], action.payload.vote);
    default:
      return state;
  }
}
