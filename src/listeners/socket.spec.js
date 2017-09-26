import { expect } from 'chai';
import { spy } from 'sinon';
import { EventEmitter } from 'events';

import socketListener from './socket';
import { addPlayer, updateVote, removePlayer } from '../actions/players';

describe('Socket Listener', () => {
  let socketMock;
  let dispatchMock;

  beforeEach(() => {
    socketMock = new EventEmitter();
    dispatchMock = spy();
    socketListener(socketMock, dispatchMock);
  });

  it('should dispatch addPlayer when newPlayer event is fired', () => {
    socketMock.emit('playerJoined', {
      playerId: 'Steve'
    });

    expect(
      dispatchMock
        .calledWithExactly(addPlayer('Steve'))
    ).to.be.true;
  });

  it('should dispatch updateVote when voteUpdated event is fired', () => {
    socketMock.emit('voteUpdated', {
      playerId: 'Simon',
      vote: 5
    });

    expect(
      dispatchMock
        .calledWithExactly(updateVote('Simon', 5))
    ).to.be.true;
  });

  it('should dispatch removePlayer when playerLeft event is fired', () => {
    socketMock.emit('playerLeft', {
      playerId: 'Dave'
    });

    expect(
      dispatchMock
        .calledWithExactly(removePlayer('Dave'))
    ).to.be.true;
  });
});
