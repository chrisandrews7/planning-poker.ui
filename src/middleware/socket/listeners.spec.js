import { expect } from 'chai';
import { spy } from 'sinon';
import { EventEmitter } from 'events';

import socketListener from './listeners';
import { newPlayer, playerVote, removePlayer } from '../../actions/players';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  PLAYER_VOTED,
  GAME_UPDATED
} from '../../constants/eventTypes';

describe('Socket Middleware - Listeners', () => {
  let socketMock;
  let dispatchSpy;

  beforeAll(() => {
    socketMock = new EventEmitter();

    dispatchSpy = spy();
    socketListener(socketMock, dispatchSpy);
  });

  afterEach(() => {
    dispatchSpy.reset();
  });

  describe('when GAME_UPDATED is fired', () => {
    xit('omits dispatching newPlayer() with the current user', () => {
      socketMock.id = '111';
      socketMock.emit(GAME_UPDATED, {
        game: {
          111: {
            name: 'Simon',
            vote: 5
          },
          456: {
            name: 'Susan',
            vote: 10
          }
        }
      });

      expect(
      dispatchSpy
        .calledWith(newPlayer({
          id: '456',
          name: 'Susan',
          vote: 10
        }))
    ).to.be.true;
      expect(dispatchSpy.calledOnce).to.be.true;
    });

    it('dispatches newPlayer() with the players', () => {
      socketMock.emit(GAME_UPDATED, {
        game: {
          123: {
            name: 'Simon',
            vote: 5
          },
          456: {
            name: 'Susan',
            vote: 10
          }
        }
      });

      expect(
        dispatchSpy
          .firstCall
          .calledWith(newPlayer({
            id: '123',
            name: 'Simon',
            vote: 5
          }))
      ).to.be.true;

      expect(
        dispatchSpy
          .secondCall
          .calledWith(newPlayer({
            id: '456',
            name: 'Susan',
            vote: 10
          }))
      ).to.be.true;
    });
  });

  describe('when PLAYER_JOINED is fired', () => {
    it('dispatches newPlayer', () => {
      socketMock.emit(PLAYER_JOINED, {
        id: 234,
        name: 'David'
      });

      expect(
      dispatchSpy
        .calledWithExactly(newPlayer({
          id: 234,
          name: 'David'
        }))
    ).to.be.true;
    });
  });

  describe('when PLAYER_VOTED is fired', () => {
    it('dispatches playerVote()', () => {
      socketMock.emit(PLAYER_VOTED, {
        id: 567,
        vote: 5
      });

      expect(
      dispatchSpy
        .calledWithExactly(playerVote({
          id: 567,
          vote: 5
        }))
    ).to.be.true;
    });
  });

  describe('when PLAYER_LEFT is fired', () => {
    it('dispatches removePlayer()', () => {
      socketMock.emit(PLAYER_LEFT, {
        id: 789
      });

      expect(
      dispatchSpy
        .calledWithExactly(removePlayer({
          id: 789
        }))
    ).to.be.true;
    });
  });
});
