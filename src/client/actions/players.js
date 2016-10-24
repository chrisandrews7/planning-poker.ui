import * as types from '../constants/actionTypes';

export function addPlayer(name, vote) {
  return {
    type: types.ADD_PLAYER,
    name,
    vote
  };
}

export function removePlayer(name) {
  return {
    type: types.REMOVE_PLAYER,
    name
  };
}

export function updateVote(name, vote) {
  return {
    type: types.UPDATE_VOTE,
    name,
    vote
  };
}
