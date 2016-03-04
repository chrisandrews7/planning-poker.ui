import { VOTING_CHANGED, ERROR } from '../../shared/constants/events';
import { getVotes, setVote } from '../models/vote';

async function vote(data, gameId) {
  try {
    await setVote(gameId, data.user, data.vote);
    const result = await getVotes(gameId);
    this.to(gameId).emit(VOTING_CHANGED, result);
  } catch (exception) {
    this.emit(ERROR, exception);
  }
}

async function join(gameId) {
  try {
    this.join(gameId);
    const result = await getVotes(gameId);
    this.emit(VOTING_CHANGED, result);
  } catch (exception) {
    this.emit(ERROR, exception);
  }

}

export default {vote, join};