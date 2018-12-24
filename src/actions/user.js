import {
  JOINING_GAME,
  USER_VOTED,
  JOINED_GAME,
  CONNECTION_LOST
} from '../constants/actionTypes';

export const joinGame = ({ gameId, name }) => ({
  type: JOINING_GAME,
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

export const setGameJoined = () => ({
  type: JOINED_GAME
});

export const setConnectionLost = () => ({
  type: CONNECTION_LOST
});
