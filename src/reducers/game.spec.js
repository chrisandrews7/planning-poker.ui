import { expect } from 'chai';
import { Map } from 'immutable';
import reducer from './game';
import * as types from '../constants/actionTypes';

describe('Game Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(Map({
      connected: false,
      allVoted: false,
      gameId: undefined,
      board: {}
    }));
  });
  describe('GAME_ID_UPDATED', () => {
    it('updates the gameId', () => {
      const gameId = 'G123';
      const action = {
        type: types.GAME_ID_UPDATED,
        payload: {
          gameId
        }
      };

      expect(reducer(undefined, action).get('gameId')).to.equal(gameId);
    });
  });

  describe('JOINING_GAME', () => {
    it('updates the connected status', () => {
      const action = {
        type: types.JOINING_GAME
      };

      expect(reducer(Map({ connected: true }), action).get('connected')).to.be.false;
    });
  });

  describe('CONNECTION_LOST', () => {
    it('updates the connected status', () => {
      const action = {
        type: types.CONNECTION_LOST
      };

      expect(reducer(Map({ connected: true }), action).get('connected')).to.be.false;
    });
  });

  describe('JOINED_GAME', () => {
    it('updates the connected status', () => {
      const action = {
        type: types.JOINED_GAME
      };

      expect(reducer(undefined, action).get('connected')).to.be.true;
    });
  });

  describe('LEFT_GAME', () => {
    it('updates the connected status', () => {
      const action = {
        type: types.LEFT_GAME
      };

      expect(reducer(Map({ connected: true }), action).get('connected')).to.be.false;
    });
  });

  describe('BOARD_UPDATED', () => {
    it('replaces the current board', () => {
      const board = {
        12345: {
          id: 12345,
          name: 'Tina',
          vote: 12
        },
        6789: {
          id: 6789,
          name: 'Brian'
        }
      };

      const action = {
        type: types.BOARD_UPDATED,
        payload: {
          board
        }
      };

      expect(reducer(undefined, action).get('board')).to.deep.equal(board);
      expect(reducer(undefined, action).get('allVoted')).to.be.false;
    });

    describe('when no players are on the board', () => {
      it('sets the allVoted status to true', () => {
        const action = {
          type: types.BOARD_UPDATED,
          payload: {
            board: {}
          }
        };

        expect(reducer(undefined, action).get('allVoted')).to.be.false;
      });
    });

    describe('when all players have voted', () => {
      it('sets the allVoted status to true', () => {
        const board = {
          12345: {
            id: 12345,
            name: 'Tina',
            vote: 5
          },
          6789: {
            id: 6789,
            name: 'Brian',
            vote: 13
          }
        };

        const action = {
          type: types.BOARD_UPDATED,
          payload: {
            board
          }
        };

        expect(reducer(undefined, action).get('board')).to.deep.equal(board);
        expect(reducer(undefined, action).get('allVoted')).to.be.true;
      });
    });
  });
});
