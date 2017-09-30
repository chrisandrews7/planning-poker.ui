import {
  SET_USER,
  SET_VOTE
} from '../constants/actionTypes';

export const setUser = name => ({
  type: SET_USER,
  payload: {
    name
  }
});

export const setVote = vote => ({
  type: SET_VOTE,
  payload: {
    vote
  }
});
