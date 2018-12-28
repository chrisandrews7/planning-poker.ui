import {
  USER_VOTED,
  NAME_UPDATED
} from '../constants/actionTypes';

export const setName = name => ({
  type: NAME_UPDATED,
  payload: {
    name
  }
});

export const setVote = vote => ({
  type: USER_VOTED,
  payload: {
    vote
  }
});
