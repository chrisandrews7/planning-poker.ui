import { expect } from 'chai';
import * as actions from './players';
import * as actionTypes from '../constants/actionTypes';

describe('Player Actions', () => {
  describe('newPlayer()', () => {
    it('returns a PLAYER_JOINED action', () => {
      const id = 12345;
      const name = 'Susan';
      const vote = 5;

      expect(actions.newPlayer({
        id,
        name,
        vote
      })).to.deep.equal({
        type: actionTypes.PLAYER_JOINED,
        payload: {
          id,
          name,
          vote
        }
      });
    });
  });

  describe('removePlayer()', () => {
    it('returns a PLAYER_LEFT action', () => {
      const id = 12345;

      expect(actions.removePlayer({ id })).to.deep.equal({
        type: actionTypes.PLAYER_LEFT,
        payload: {
          id
        }
      });
    });
  });

  describe('playerVote()', () => {
    it('returns a PLAYER_VOTED action', () => {
      const id = 12345;
      const vote = 10;

      expect(actions.playerVote({
        id,
        vote
      })).to.deep.equal({
        type: actionTypes.PLAYER_VOTED,
        payload: {
          id,
          vote
        }
      });
    });
  });
});
