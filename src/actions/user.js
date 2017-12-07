import * as idGenerator from '../utils/idGenerator';
import {
  SET_USER,
  SET_VOTE,
  SET_GAME,
  JOIN_GAME
} from '../constants/actionTypes';
import { VOTE, JOIN } from '../constants/eventTypes';

export const setUser = name => ({
  type: SET_USER,
  payload: {
    name
  }
});

export const setVote = vote => state => ({
  type: SET_VOTE,
  payload: {
    vote
  },
  meta: {
    emit: {
      type: VOTE,
      params: {
        vote,
        playerId: state.getIn(['user', 'name']),
        gameId: state.getIn(['user', 'gameId'])
      }
    }
  }
});

export const setGame = gameId => ({
  type: SET_GAME,
  payload: {
    gameId
  }
});

export const join = () => state => ({
  type: JOIN_GAME,
  meta: {
    emit: {
      type: JOIN,
      params: {
        playerId: state.getIn(['user', 'name']),
        gameId: state.getIn(['user', 'gameId'])
      }
    }
  }
});

export const setRandomGame = () => setGame(idGenerator.generateShortId());
