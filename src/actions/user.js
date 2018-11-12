import {
  USER_JOINING_GAME,
  USER_VOTED,
  SOCKET_CONNECTED,
  SOCKET_LOADING
} from '../constants/actionTypes';

export const joinGame = ({ gameId, name }) => ({
  type: USER_JOINING_GAME,
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

export const connectSocket = () => ({
  type: SOCKET_CONNECTED
});

export const loadingSocket = () => ({
  type: SOCKET_LOADING
});
