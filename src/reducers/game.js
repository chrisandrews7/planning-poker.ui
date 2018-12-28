import { Map } from 'immutable';
import {
  GAME_ID_UPDATED,
  JOINING_GAME,
  JOINED_GAME,
  CONNECTION_LOST,
  BOARD_UPDATED
} from '../constants/actionTypes';

const initialState = Map({
  connected: false,
  gameId: undefined,
  board: {}
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case GAME_ID_UPDATED:
      return state.set('gameId', action.payload.gameId);
    case JOINING_GAME:
    case CONNECTION_LOST:
      return state.set('connected', false);
    case JOINED_GAME:
      return state.set('connected', true);
    case BOARD_UPDATED:
      return state.set('board', action.payload.board);
    default:
      return state;
  }
}
