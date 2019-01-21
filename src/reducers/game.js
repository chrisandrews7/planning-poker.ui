import { Map } from 'immutable';
import { every, size } from 'lodash';
import {
  GAME_ID_UPDATED,
  JOINING_GAME,
  JOINED_GAME,
  CONNECTION_LOST,
  BOARD_UPDATED,
  LEFT_GAME
} from '../constants/actionTypes';

const initialState = Map({
  connected: false,
  allVoted: false,
  gameId: undefined,
  board: {}
});

export default function user(state = initialState, action) {
  switch (action.type) {
    case GAME_ID_UPDATED:
      return state.set('gameId', action.payload.gameId);
    case JOINING_GAME:
    case LEFT_GAME:
    case CONNECTION_LOST:
      return state.set('connected', false);
    case JOINED_GAME:
      return state.set('connected', true);
    case BOARD_UPDATED:
      const haveAllVoted = !!(
        size(action.payload.board)
        && every(action.payload.board, player => !!player.vote)
      );
      return state
        .set('board', action.payload.board)
        .set('allVoted', haveAllVoted);
    default:
      return state;
  }
}
