import { expect } from 'chai';
import { spy } from 'sinon';
import { fromJS } from 'immutable';
import * as actionTypes from '../../constants/actionTypes';
import { VOTE, JOIN, RESET } from '../../constants/eventTypes';

import publish from './publish';

describe('Socket Middleware - Publish', () => {
  const socketMock = {
    emit: spy(),
    connect: spy(),
    close: spy()
  };

  afterEach(() => {
    socketMock.emit.resetHistory();
  });

  describe('when a JOINING_GAME action is fired', () => {
    const mockState = {
      user: {
        name: 'Test',
        isObserver: true
      },
      game: {
        gameId: 'G123'
      }
    };

    beforeEach(() => {
      const getState = () => fromJS(mockState);

      publish(socketMock)({ getState })(() => {})({
        type: actionTypes.JOINING_GAME
      });
    });

    it('opens a socket connection', () => {
      expect(socketMock.connect).to.have.been.calledOnce;
    });

    it('emits a JOIN event', () => {
      expect(socketMock.emit).to.have.been.calledWithExactly(JOIN, {
        name: mockState.user.name,
        gameId: mockState.game.gameId,
        isObserver: mockState.user.isObserver
      });
    });
  });

  describe('when a USER_VOTED action is fired', () => {
    it('emits a VOTE event', () => {
      const action = {
        type: actionTypes.USER_VOTED,
        payload: {
          vote: 13
        }
      };
      publish(socketMock)()(() => {})(action);

      expect(socketMock.emit).to.have.been.calledWithExactly(VOTE, {
        vote: action.payload.vote
      });
    });
  });

  describe('when a LEFT_GAME action is fired', () => {
    it('closes the socket connection', () => {
      const action = {
        type: actionTypes.LEFT_GAME
      };
      publish(socketMock)()(() => {})(action);

      expect(socketMock.close).to.have.been.calledOnce;
    });
  });

  describe('when a VOTES_RESET action is fired', () => {
    it('emits a RESET event', () => {
      const action = {
        type: actionTypes.VOTES_RESET
      };
      publish(socketMock)()(() => {})(action);

      expect(socketMock.emit).to.have.been.calledWithExactly(RESET);
    });
  });

  describe('when an action isnt JOINING_GAME or USER_VOTED', () => {
    it('emits nothing', () => {
      const action = {
        type: 'ANOTHER_ACTION_TYPE'
      };
      publish(socketMock)()(() => {})(action);

      expect(socketMock.emit).to.have.not.been.called;
    });
  });

  it('should invoke the next action', () => {
    const mockNext = spy();
    publish(socketMock)()(mockNext)('action');

    expect(mockNext).to.have.been.calledWith('action');
  });
});
