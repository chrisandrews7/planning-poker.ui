import { Map } from 'immutable';
import { SET_USER } from '../constants/actionTypes';

const initialState = Map();

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set('id', action.id);
    default:
      return state;
  }
}
