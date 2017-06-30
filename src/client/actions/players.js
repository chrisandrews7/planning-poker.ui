import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_VOTE } from '../constants/actionTypes';

function addPlayer(name, vote) {
  return {
    type: ADD_PLAYER,
    name,
    vote
  };
}

function removePlayer(name) {
  return {
    type: REMOVE_PLAYER,
    name
  };
}

function updateVote(name, vote) {
  return {
    type: UPDATE_VOTE,
    name,
    vote
  };
}

export default {
  addPlayer,
  removePlayer,
  updateVote
};
