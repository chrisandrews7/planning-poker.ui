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
  let dispatchMock;

  beforeEach(() => {
    socketMock = new EventEmitter();
    dispatchMock = spy();
    socketListener(socketMock, dispatchMock);
  });

  it('should dispatch newPlayer with the players when GAME_UPDATED event is fired', () => {
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
      dispatchMock
        .firstCall
        .calledWith(newPlayer({
          id: '123',
          name: 'Simon',
          vote: 5
        }))
    ).to.be.true;

    expect(
      dispatchMock
        .secondCall
        .calledWith(newPlayer({
          id: '456',
          name: 'Susan',
          vote: 10
        }))
    ).to.be.true;
  });

  it('should dispatch newPlayer when PLAYER_JOINED event is fired', () => {
    socketMock.emit(PLAYER_JOINED, {
      id: 234,
      name: 'David'
    });

    expect(
      dispatchMock
        .calledWithExactly(newPlayer({
          id: 234,
          name: 'David'
        }))
    ).to.be.true;
  });

  it('should dispatch playerVote when PLAYER_VOTED event is fired', () => {
    socketMock.emit(PLAYER_VOTED, {
      id: 567,
      vote: 5
    });

    expect(
      dispatchMock
        .calledWithExactly(playerVote({
          id: 567,
          vote: 5
        }))
    ).to.be.true;
  });

  it('should dispatch removePlayer when PLAYER_LEFT event is fired', () => {
    socketMock.emit(PLAYER_LEFT, {
      id: 789
    });

    expect(
      dispatchMock
        .calledWithExactly(removePlayer({
          id: 789
        }))
    ).to.be.true;
  });
});
