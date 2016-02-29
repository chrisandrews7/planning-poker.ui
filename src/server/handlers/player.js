import { VOTING_CHANGED } from '../../shared/constants/events';

export function vote(data) {
  this.emit(VOTING_CHANGED, data);
}
