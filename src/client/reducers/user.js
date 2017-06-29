import { Map } from 'immutable';
import { SET_USER, SET_ROOM } from '../constants/actionTypes';

const initialState = Map();

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set('name', action.name);
    case SET_ROOM:
      return state.set('room', action.room);
    default:
      return state;
  }
}
