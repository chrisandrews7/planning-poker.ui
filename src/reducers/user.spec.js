import { expect } from 'chai';
import { Map } from 'immutable';
import reducer from './user';
import * as types from '../constants/actionTypes';

describe('User Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(Map({
      name: undefined,
      vote: undefined,
      observer: false
    }));
  });

  describe('USER_VOTED', () => {
    it('updates the users vote', () => {
      const vote = 13;
      const action = {
        type: types.USER_VOTED,
        payload: {
          vote
        }
      };

      expect(reducer(undefined, action).get('vote')).to.equal(vote);
    });
  });

  describe('NAME_UPDATED', () => {
    it('updates the users name', () => {
      const name = 'Derek';
      const action = {
        type: types.NAME_UPDATED,
        payload: {
          name
        }
      };

      expect(reducer(undefined, action).get('name')).to.equal(name);
    });
  });

  describe('ONLY_OBSERVING', () => {
    it('updates the observer status', () => {
      const action = {
        type: types.ONLY_OBSERVING
      };

      expect(reducer(undefined, action).get('observer')).to.equal(true);
    });
  });
});
