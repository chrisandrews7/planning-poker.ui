import * as idGenerator from '../utils/idGenerator';
import { SET_USER, SET_GAME } from '../constants/actionTypes';

export const setUser = (name) => ({
  type: SET_USER,
  name
});

export const setGame = (gameId) => ({
  type: SET_GAME,
  gameId,
  redirect: gameId
});

export const startNewGame = () => setGame(idGenerator.generateShortId());
