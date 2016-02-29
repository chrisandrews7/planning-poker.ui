import { VOTING_CHANGED, ERROR } from '../../shared/constants/events';

export function vote(data, gameId) {
  if (!gameId) {
    this.emit(ERROR, 'No gameId present');
  }
  this.to(gameId).emit(VOTING_CHANGED, data);
}
