import { expect } from 'chai';
import { spy } from 'sinon';
import { joinGame, setVote } from '../../actions/user';
import { VOTE, JOIN } from '../../constants/eventTypes';

import socketEmitter from './emitters';

describe('Socket Middleware - Emitters', () => {
  const socketMock = {
    emit: spy()
  };

  afterEach(() => {
    socketMock.emit.reset();
  });

  it('should emit a JOIN event when a USER_JOINED_GAME action is dispatched', () => {
    const action = joinGame({
      name: 'Sharon',
      gameId: 345678
    });
    socketEmitter(socketMock)()(() => {})(action);


    expect(
      socketMock
        .emit
        .calledWithExactly(JOIN, {
          name: action.payload.name,
          gameId: action.payload.gameId
        })
    ).to.be.true;
  });

  it('should emit a VOTE event when a USER_VOTED action is dispatched', () => {
    const action = setVote({
      vote: 13
    });
    socketEmitter(socketMock)()(() => {})(action);


    expect(
      socketMock
        .emit
        .calledWithExactly(VOTE, {
          vote: action.payload.vote
        })
    ).to.be.true;
  });

  it('should emit nothing if the action isnt USER_JOINED_GAME or USER_VOTED', () => {
    const action = {
      type: 'ANOTHER_ACTION_TYPE'
    };
    socketEmitter(socketMock)()(() => {})(action);

    expect(
      socketMock
        .emit
        .notCalled
    ).to.be.true;
  });

  it('should call the next action', () => {
    const mockNext = spy();
    socketEmitter(socketMock)()(mockNext)('action');

    expect(mockNext.calledWith('action')).to.be.ok;
  });
});
