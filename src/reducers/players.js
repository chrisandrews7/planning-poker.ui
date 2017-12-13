import { Map } from 'immutable';
import { REMOVE_PLAYER, UPDATE_PLAYER } from '../constants/actionTypes';

const initialState = Map();

export default function players(state = initialState, action) {
  switch (action.type) {
    case REMOVE_PLAYER:
      return state.delete(action.payload.name);
    case UPDATE_PLAYER:
      return state.set(action.payload.name, Map({
        name: action.payload.name,
        vote: action.payload.vote
      }));
    default:
      return state;
  }
}
