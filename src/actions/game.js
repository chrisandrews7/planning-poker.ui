import * as idGenerator from '../utils/idGenerator';
import {
  SET_GAME,
  JOIN_GAME
} from '../constants/actionTypes';
import { JOIN } from '../constants/eventTypes';

export const setGame = id => ({
  type: SET_GAME,
  payload: {
    id
  }
});

export const join = (gameId, playerId) => ({
  type: JOIN_GAME,
  meta: {
    emit: {
      type: JOIN,
      params: {
        playerId,
        gameId
      }
    }
  }
});

export const setRandomGame = () => setGame(idGenerator.generateShortId());
