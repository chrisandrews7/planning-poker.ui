import { VOTING_CHANGED, ERROR } from '../../shared/constants/events';
import { setVote } from '../models/vote';

export async function vote(data, gameId) {
  try {
    await setVote(gameId, data.user, data.vote);
    this.to(gameId).emit(VOTING_CHANGED, data);
  } catch (exception) {
    this.emit(ERROR, exception);
  }
}
