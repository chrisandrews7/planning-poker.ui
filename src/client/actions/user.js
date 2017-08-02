import idGenerator from '../utils/idGenerator';
import { SET_USER, SET_GAME } from '../constants/actionTypes';

function setUser(name) {
  return {
    type: SET_USER,
    name
  };
}

function setGame(gameId) {
  return {
    type: SET_GAME,
    gameId,
    redirect: gameId
  };
}

function startNewGame() {
  return setGame(idGenerator.generateShortId());
}

export default {
  setUser,
  setGame,
  startNewGame
};
