import * as idGenerator from '../utils/idGenerator';
import {
  SET_GAME,
  JOIN_GAME
} from '../constants/actionTypes';

export const setGame = id => ({
  type: SET_GAME,
  payload: {
    id
  }
});

export const joinGame = () => ({
  type: JOIN_GAME,
  meta: {
    emit: {
      type: 'poo'
    }
  }
});

export const setRandomGame = () => setGame(idGenerator.generateShortId());
