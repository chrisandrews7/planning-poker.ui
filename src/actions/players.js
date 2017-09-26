import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_VOTE } from '../constants/actionTypes';

export const addPlayer = name => ({
  type: ADD_PLAYER,
  payload: {
    name
  }
});

export const removePlayer = name => ({
  type: REMOVE_PLAYER,
  payload: {
    name
  }
});

export const updateVote = (name, vote) => ({
  type: UPDATE_VOTE,
  payload: {
    name,
    vote
  }
});
