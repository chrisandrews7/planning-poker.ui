import {
  USER_JOINED_GAME,
  USER_VOTED
} from '../constants/actionTypes';

export const joinGame = ({ gameId, name }) => ({
  type: USER_JOINED_GAME,
  payload: {
    gameId,
    name
  }
});

export const setVote = vote => ({
  type: USER_VOTED,
  payload: {
    vote
  }
});
