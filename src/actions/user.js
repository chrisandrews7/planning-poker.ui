import * as idGenerator from '../utils/idGenerator';
import { SET_USER, SET_GAME } from '../constants/actionTypes';

export const setUser = name => ({
  type: SET_USER,
  payload: {
    name
  }
});

export const setGame = gameId => ({
  type: SET_GAME,
  payload: {
    gameId
  },
  meta: {
    redirect: gameId
  }
});

export const startNewGame = () => setGame(idGenerator.generateShortId());
