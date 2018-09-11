import { expect } from 'chai';
import {
  newPlayer,
  removePlayer,
  playerVote
} from './players';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  PLAYER_VOTED
} from '../constants/actionTypes';

describe('Player Actions', () => {
  describe('newPlayer()', () => {
    it('returns a PLAYER_JOINED action', () => {
      const id = 12345;
      const name = 'Susan';
      const vote = 5;

      expect(newPlayer({
        id,
        name,
        vote
      })).to.deep.equal({
        type: PLAYER_JOINED,
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

      expect(removePlayer({ id })).to.deep.equal({
        type: PLAYER_LEFT,
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

      expect(playerVote({
        id,
        vote
      })).to.deep.equal({
        type: PLAYER_VOTED,
        payload: {
          id,
          vote
        }
      });
    });
  });
});
