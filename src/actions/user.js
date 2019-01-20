import {
  USER_VOTED,
  NAME_UPDATED,
  ONLY_OBSERVING
} from '../constants/actionTypes';

export const setName = name => ({
  type: NAME_UPDATED,
  payload: {
    name
  }
});

export const observe = () => ({
  type: ONLY_OBSERVING
});

export const setVote = vote => ({
  type: USER_VOTED,
  payload: {
    vote
  }
});
