import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_VOTE } from '../constants/actionTypes';

export const addPlayer = (name, vote) => ({
  type: ADD_PLAYER,
  name,
  vote
});

export const removePlayer = name => ({
  type: REMOVE_PLAYER,
  name
});

export const updateVote = (name, vote) => ({
  type: UPDATE_VOTE,
  name,
  vote
});
