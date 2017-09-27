import * as idGenerator from '../utils/idGenerator';
import {
  SET_USER,
  SET_GAME,
  SET_VOTE
} from '../constants/actionTypes';
import { JOIN } from '../constants/eventTypes';

export const setUser = name => ({
  type: SET_USER,
  payload: {
    name
  }
});

export const setVote = vote => ({
  type: SET_VOTE,
  payload: {
    vote
  }
});

export const setGame = gameId => ({
  type: SET_GAME,
  payload: {
    gameId
  },
  meta: {
    redirect: gameId,
    emit: {
      type: JOIN,
      params: {
        gameId
      }
    }
  }
});

export const startNewGame = () => setGame(idGenerator.generateShortId());
