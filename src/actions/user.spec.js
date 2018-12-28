import { expect } from 'chai';
import * as actionTypes from '../constants/actionTypes';
import * as actions from './user';

describe('User Actions', () => {
  describe('setVote()', () => {
    it('returns a USER_VOTED action', () => {
      const vote = 13;

      expect(actions.setVote(vote)).to.deep.equal({
        type: actionTypes.USER_VOTED,
        payload: {
          vote
        }
      });
    });
  });

  describe('setUser()', () => {
    it('returns a USER_UPDATED action', () => {
      const gameId = 12345;
      const name = 'Herbert';

      expect(actions.setUser({ gameId, name })).to.deep.equal({
        type: actionTypes.USER_UPDATED,
        payload: {
          gameId,
          name
        }
      });
    });
  });

  describe('joinGame()', () => {
    it('returns a JOINING_GAME action', () => {
      expect(actions.joinGame()).to.deep.equal({
        type: actionTypes.JOINING_GAME
      });
    });
  });

  describe('setConnectionLost()', () => {
    it('returns a CONNECTION_LOST action', () => {
      expect(actions.setConnectionLost()).to.deep.equal({
        type: actionTypes.CONNECTION_LOST
      });
    });
  });

  describe('setGameJoined()', () => {
    it('returns a JOINED_GAME action', () => {
      expect(actions.setGameJoined()).to.deep.equal({
        type: actionTypes.JOINED_GAME
      });
    });
  });
});
