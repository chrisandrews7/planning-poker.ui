import { PLAYER_JOINED, PLAYER_LEFT, PLAYER_VOTED } from '../constants/actionTypes';

export const newPlayer = ({ id, name, vote }) => ({
  type: PLAYER_JOINED,
  payload: {
    id,
    name,
    vote
  }
});

export const removePlayer = ({ id }) => ({
  type: PLAYER_LEFT,
  payload: {
    id
  }
});

export const playerVote = ({ id, vote }) => ({
  type: PLAYER_VOTED,
  payload: {
    id,
    vote
  }
});
