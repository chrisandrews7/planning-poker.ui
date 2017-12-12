import { REMOVE_PLAYER, UPDATE_VOTE } from '../constants/actionTypes';

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
