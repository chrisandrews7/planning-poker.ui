import { Map } from 'immutable';
import { SET_GAME } from '../constants/actionTypes';

const initialState = Map({
  id: undefined
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_GAME:
      return state.set('id', action.payload.id);
    default:
      return state;
  }
}
