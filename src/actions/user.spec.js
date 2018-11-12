import { expect } from 'chai';
import {
  USER_JOINING_GAME, USER_VOTED, SOCKET_CONNECTED, SOCKET_LOADING
} from '../constants/actionTypes';
import {
  setVote, joinGame, connectSocket, loadingSocket
} from './user';

describe('User Actions', () => {
  describe('setVote()', () => {
    it('returns a USER_VOTED action', () => {
      const vote = 13;

      expect(setVote(vote)).to.deep.equal({
        type: USER_VOTED,
        payload: {
          vote
        }
      });
    });
  });

  describe('joinGame()', () => {
    it('returns a USER_JOINING_GAME action', () => {
      const gameId = 12345;
      const name = 'Herbert';

      expect(joinGame({ gameId, name })).to.deep.equal({
        type: USER_JOINING_GAME,
        payload: {
          gameId,
          name
        }
      });
    });
  });

  describe('loadingSocket()', () => {
    it('returns a SOCKET_LOADING action', () => {
      expect(loadingSocket()).to.deep.equal({
        type: SOCKET_LOADING
      });
    });
  });

  describe('connectSocket()', () => {
    it('returns a SOCKET_CONNECTED action', () => {
      expect(connectSocket()).to.deep.equal({
        type: SOCKET_CONNECTED
      });
    });
  });
});
