import {
  JOINING_GAME,
  USER_VOTED,
  USER_UPDATED,
  JOINED_GAME,
  CONNECTION_LOST
} from '../constants/actionTypes';

export const setUser = ({ gameId, name }) => ({
  type: USER_UPDATED,
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

export const joinGame = () => ({
  type: JOINING_GAME
});

export const setGameJoined = () => ({
  type: JOINED_GAME
});

export const setConnectionLost = () => ({
  type: CONNECTION_LOST
});
