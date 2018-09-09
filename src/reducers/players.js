import { Map } from 'immutable';
import { PLAYER_LEFT, PLAYER_VOTED, PLAYER_JOINED } from '../constants/actionTypes';

const initialState = Map();

export default function players(state = initialState, action) {
  switch (action.type) {
    case PLAYER_JOINED:
      return state.set(action.payload.id, Map({
        name: action.payload.name,
        vote: action.payload.vote
      }));
    case PLAYER_LEFT:
      return state.delete(action.payload.id);
    case PLAYER_VOTED:
      return state.setIn([action.payload.id, 'vote'], action.payload.vote);
    default:
      return state;
  }
}
