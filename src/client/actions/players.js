import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_VOTE } from '../constants/actionTypes';

export function addPlayer(name, vote) {
  return {
    type: ADD_PLAYER,
    name,
    vote
  };
}

export function removePlayer(name) {
  return {
    type: REMOVE_PLAYER,
    name
  };
}

export function updateVote(name, vote) {
  return {
    type: UPDATE_VOTE,
    name,
    vote
  };
}
