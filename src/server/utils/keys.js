import { VOTES, GAME, PLAYERS } from '../../shared/constants/terms';

export default {
  votes: (gameId) => `${GAME}:${gameId}:${VOTES}`,
  players: (gameId) => `${GAME}:${gameId}:${PLAYERS}`
};
