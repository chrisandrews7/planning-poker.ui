import {
  PLAYER_JOINED,
  CONNECT,
  PLAYER_LEFT,
  ERROR } from '../../shared/constants/events';
import playerRepo from '../repositories/player';
import voteRepo from '../repositories/vote';

async function join(gameId, playerId) {
  try {
    this.join(gameId);
    await playerRepo.addPlayer(gameId, playerId);
    const votes = await voteRepo.getVotes(gameId);
    this.broadcast
      .to(gameId)
      .emit(PLAYER_JOINED, {
        playerId
      });
    this.emit(CONNECT, {
      votes
    });
  } catch (exception) {
    this.emit(ERROR, exception);
  }
}

async function leave(gameId, playerId) {
  try {
    this.leave(gameId);
    await playerRepo.removePlayer(gameId, playerId);
    this.broadcast
      .to(gameId)
      .emit(PLAYER_LEFT, {
        playerId
      });
  } catch (exception) {
    this.emit(ERROR, exception);
  }
}

export default {
  join,
  leave
};
