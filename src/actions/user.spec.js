import { expect } from 'chai';
import {
  JOINING_GAME, USER_VOTED, JOINED_GAME, CONNECTION_LOST
} from '../constants/actionTypes';
import {
  setVote, joinGame, setGameJoined, setConnectionLost
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
    it('returns a JOINING_GAME action', () => {
      const gameId = 12345;
      const name = 'Herbert';

      expect(joinGame({ gameId, name })).to.deep.equal({
        type: JOINING_GAME,
        payload: {
          gameId,
          name
        }
      });
    });
  });

  describe('setConnectionLost()', () => {
    it('returns a CONNECTION_LOST action', () => {
      expect(setConnectionLost()).to.deep.equal({
        type: CONNECTION_LOST
      });
    });
  });

  describe('setGameJoined()', () => {
    it('returns a JOINED_GAME action', () => {
      expect(setGameJoined()).to.deep.equal({
        type: JOINED_GAME
      });
    });
  });
});
