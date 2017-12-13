import { expect } from 'chai';
import { spy } from 'sinon';
import { EventEmitter } from 'events';

import socketListener from './listeners';
import { updatePlayer, removePlayer } from '../../actions/players';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  VOTE_UPDATED
} from '../../constants/eventTypes';

describe('Socket Middleware - Listeners', () => {
  let socketMock;
  let dispatchMock;

  beforeEach(() => {
    socketMock = new EventEmitter();
    dispatchMock = spy();
    socketListener(socketMock, dispatchMock);
  });

  it('should dispatch updatePlayer when PLAYER_JOINED event is fired', () => {
    socketMock.emit(PLAYER_JOINED, {
      playerId: 'Steve'
    });

    expect(
      dispatchMock
        .calledWithExactly(updatePlayer('Steve'))
    ).to.be.true;
  });

  it('should dispatch updatePlayer when VOTE_UPDATED event is fired', () => {
    socketMock.emit(VOTE_UPDATED, {
      playerId: 'Simon',
      vote: 5
    });

    expect(
      dispatchMock
        .calledWithExactly(updatePlayer('Simon', 5))
    ).to.be.true;
  });

  it('should dispatch removePlayer when PLAYER_LEFT event is fired', () => {
    socketMock.emit(PLAYER_LEFT, {
      playerId: 'Dave'
    });

    expect(
      dispatchMock
        .calledWithExactly(removePlayer('Dave'))
    ).to.be.true;
  });
});
