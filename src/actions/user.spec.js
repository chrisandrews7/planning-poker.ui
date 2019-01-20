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

  describe('setName()', () => {
    it('returns a NAME_UPDATED action', () => {
      const name = 'Herbert';

      expect(actions.setName(name)).to.deep.equal({
        type: actionTypes.NAME_UPDATED,
        payload: {
          name
        }
      });
    });
  });

  describe('observe()', () => {
    it('returns a ONLY_OBSERVING action', () => {
      expect(actions.observe()).to.deep.equal({
        type: actionTypes.ONLY_OBSERVING
      });
    });
  });
});
