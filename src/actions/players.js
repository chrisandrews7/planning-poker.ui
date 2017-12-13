import { REMOVE_PLAYER, UPDATE_PLAYER } from '../constants/actionTypes';

export const removePlayer = name => ({
  type: REMOVE_PLAYER,
  payload: {
    name
  }
});

export const updatePlayer = (name, vote) => ({
  type: UPDATE_PLAYER,
  payload: {
    name,
    vote
  }
});
