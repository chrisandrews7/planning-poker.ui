import * as types from '../constants/actionTypes';

export function addPlayer(name, vote) {
  return {
    type: types.ADD_PLAYER,
    name,
    vote
  };
}
