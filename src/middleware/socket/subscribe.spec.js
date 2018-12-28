import { expect } from 'chai';
import { spy } from 'sinon';
import { EventEmitter } from 'events';

import subscribe from './subscribe';
import {
  setConnectionLost, setGameJoined, joinGame, updateBoard
} from '../../actions/game';
import * as eventTypes from '../../constants/eventTypes';

describe('Socket Middleware - Subscribe', () => {
  let socketMock;
  let dispatchSpy;

  beforeAll(() => {
    socketMock = new EventEmitter();

    dispatchSpy = spy();
    subscribe(socketMock, dispatchSpy);
  });

  afterEach(() => {
    dispatchSpy.resetHistory();
  });

  describe('when BOARD_UPDATED is fired', () => {
    it('dispatches boardUpdated()', () => {
      const board = {
        111: {
          id: 111,
          name: 'Simon',
          vote: 5
        },
        456: {
          id: 456,
          name: 'Susan',
          vote: 10
        }
      };

      socketMock.emit(eventTypes.BOARD_UPDATED, {
        board
      });

      expect(dispatchSpy).to.have.been.calledWith(updateBoard(board));
    });
  });

  describe('when JOINED_GAME is fired', () => {
    it('dispatches setGameJoined()', () => {
      socketMock.emit(eventTypes.JOINED_GAME);

      expect(dispatchSpy).to.have.been.calledWithExactly(setGameJoined());
    });
  });

  describe('when RECONNECTING is fired', () => {
    it('dispatches setConnectionLost()', () => {
      socketMock.emit(eventTypes.RECONNECTING);

      expect(dispatchSpy).to.have.been.calledWithExactly(setConnectionLost());
    });
  });

  describe('when RECONNECTED is fired', () => {
    it('dispatches joinGame()', () => {
      socketMock.emit(eventTypes.RECONNECTED);

      expect(dispatchSpy).to.have.been.calledWithExactly(joinGame());
    });
  });
});
