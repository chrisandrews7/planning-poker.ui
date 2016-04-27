import {
  PLAYER_JOINED,
  CONNECT,
  PLAYER_LEFT,
  ERROR } from '../../shared/constants/events';
import playerModel from '../repositories/player';
import voteModel from '../repositories/vote';

async function join(gameId, playerId) {
  try {
    this.join(gameId);
    await playerModel.addPlayer(gameId, playerId);
    const votes = await voteModel.getVotes(gameId);
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
    await playerModel.removePlayer(gameId, playerId);
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
