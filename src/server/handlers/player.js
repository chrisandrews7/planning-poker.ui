import { VOTE_UPDATED, ERROR } from '../../shared/constants/events';
import voteRepo from '../repositories/vote';

async function vote(voteValue, playerId, gameId) {
  try {
    await voteRepo.setVote(gameId, playerId, voteValue);
    this.broadcast
      .to(gameId)
      .emit(VOTE_UPDATED, {
        playerId,
        vote: voteValue
      });
  } catch (exception) {
    this.emit(ERROR, exception);
  }
}

export default {
  vote
};
