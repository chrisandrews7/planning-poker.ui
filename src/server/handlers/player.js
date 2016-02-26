import { VOTING_CHANGED } from '../constants/events';

export function vote(data) {
  this.emit(VOTING_CHANGED, data);
}
