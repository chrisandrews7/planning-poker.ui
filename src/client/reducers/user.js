import { Map } from 'immutable';
import { SET_USER, SET_GAME } from '../constants/actionTypes';

const initialState = Map();

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set('name', action.name);
    case SET_GAME:
      return state.set('gameId', action.gameId);
    default:
      return state;
  }
}
