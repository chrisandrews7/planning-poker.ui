import {
  GAME_ID_UPDATED,
  JOINING_GAME,
  JOINED_GAME,
  CONNECTION_LOST,
  BOARD_UPDATED,
  LEFT_GAME
} from '../constants/actionTypes';

export const setGameId = gameId => ({
  type: GAME_ID_UPDATED,
  payload: {
    gameId
  }
});

export const joinGame = () => ({
  type: JOINING_GAME
});

export const setGameJoined = () => ({
  type: JOINED_GAME
});

export const leaveGame = () => ({
  type: LEFT_GAME
});

export const setConnectionLost = () => ({
  type: CONNECTION_LOST
});

export const updateBoard = board => ({
  type: BOARD_UPDATED,
  payload: {
    board
  }
});
