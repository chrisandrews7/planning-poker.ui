import { expect } from 'chai';
import * as actions from './game';
import * as actionTypes from '../constants/actionTypes';

describe('Game Actions', () => {
  describe('setGameId()', () => {
    it('returns a GAME_ID_UPDATED action', () => {
      const gameId = 'test';

      expect(actions.setGameId(gameId)).to.deep.equal({
        type: actionTypes.GAME_ID_UPDATED,
        payload: {
          gameId
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

  describe('setGameJoined()', () => {
    it('returns a JOINED_GAME action', () => {
      expect(actions.setGameJoined()).to.deep.equal({
        type: actionTypes.JOINED_GAME
      });
    });
  });

  describe('leaveGame()', () => {
    it('returns a LEFT_GAME action', () => {
      expect(actions.leaveGame()).to.deep.equal({
        type: actionTypes.LEFT_GAME
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

  describe('updateBoard()', () => {
    it('returns a BOARD_UPDATED action', () => {
      const board = {
        player: 'vote'
      };

      expect(actions.updateBoard(board)).to.deep.equal({
        type: actionTypes.BOARD_UPDATED,
        payload: {
          board
        }
      });
    });
  });
});
