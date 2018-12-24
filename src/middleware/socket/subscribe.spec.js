import { expect } from 'chai';
import { spy } from 'sinon';
import { fromJS } from 'immutable';
import { EventEmitter } from 'events';

import subscribe from './subscribe';
import { newPlayer, playerVote, removePlayer } from '../../actions/players';
import { setConnectionLost, setGameJoined, joinGame } from '../../actions/user';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  PLAYER_VOTED,
  GAME_UPDATED,
  RECONNECTING,
  RECONNECTED
} from '../../constants/eventTypes';

describe('Socket Middleware - Subscribe', () => {
  let socketMock;
  let dispatchSpy;
  const mockState = {
    user: {
      name: 'Test',
      gameId: 'G123'
    }
  };
  const getState = () => fromJS(mockState);

  beforeAll(() => {
    socketMock = new EventEmitter();

    dispatchSpy = spy();
    subscribe(socketMock, dispatchSpy, getState);
  });

  afterEach(() => {
    dispatchSpy.resetHistory();
  });

  describe('when GAME_UPDATED is fired', () => {
    it('omits dispatching newPlayer() with the current user', () => {
      socketMock.id = '111';
      socketMock.emit(GAME_UPDATED, {
        game: {
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
        }
      });

      expect(dispatchSpy).to.have.been.calledWith(newPlayer({
        id: '456',
        name: 'Susan',
        vote: 10
      }));
      // First call is CONNECTED
      expect(dispatchSpy).to.have.been.calledTwice;
    });

    it('dispatches newPlayer() with the players', () => {
      socketMock.emit(GAME_UPDATED, {
        game: {
          123: {
            id: 123,
            name: 'Simon',
            vote: 5
          },
          456: {
            id: 456,
            name: 'Susan',
            vote: 10
          }
        }
      });

      expect(dispatchSpy.secondCall).to.have.been.calledWith(newPlayer({
        id: '123',
        name: 'Simon',
        vote: 5
      }));
      expect(dispatchSpy.thirdCall).to.have.been.calledWith(newPlayer({
        id: '456',
        name: 'Susan',
        vote: 10
      }));
    });

    it('dispatches setGameJoined()', () => {
      socketMock.emit(GAME_UPDATED, {
        game: {
          123: {
            id: 123,
            name: 'Simon',
            vote: 5
          },
          456: {
            id: 456,
            name: 'Susan',
            vote: 10
          }
        }
      });

      expect(dispatchSpy).to.have.been.calledWith(setGameJoined());
    });
  });

  describe('when PLAYER_JOINED is fired', () => {
    it('dispatches newPlayer', () => {
      socketMock.emit(PLAYER_JOINED, {
        id: 234,
        name: 'David'
      });

      expect(dispatchSpy).to.have.been.calledWithExactly(newPlayer({
        id: 234,
        name: 'David'
      }));
    });
  });

  describe('when PLAYER_VOTED is fired', () => {
    it('dispatches playerVote()', () => {
      socketMock.emit(PLAYER_VOTED, {
        id: 567,
        vote: 5
      });

      expect(dispatchSpy).to.have.been.calledWithExactly(playerVote({
        id: 567,
        vote: 5
      }));
    });
  });

  describe('when PLAYER_LEFT is fired', () => {
    it('dispatches removePlayer()', () => {
      socketMock.emit(PLAYER_LEFT, {
        id: 789
      });

      expect(dispatchSpy).to.have.been.calledWithExactly(removePlayer({
        id: 789
      }));
    });
  });

  describe('when RECONNECTING is fired', () => {
    it('dispatches setConnectionLost()', () => {
      socketMock.emit(RECONNECTING);

      expect(dispatchSpy).to.have.been.calledWithExactly(setConnectionLost());
    });
  });

  describe('when RECONNECTED is fired', () => {
    it('dispatches joinGame()', () => {
      socketMock.emit(RECONNECTED);

      expect(dispatchSpy).to.have.been.calledWithExactly(joinGame({
        gameId: mockState.user.gameId,
        name: mockState.user.name
      }));
    });
  });
});
