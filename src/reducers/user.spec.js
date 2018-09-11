import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import reducer from './user';
import * as types from '../constants/actionTypes';

describe('User Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(Map({
      name: undefined,
      vote: undefined,
      gameId: undefined
    }));
  });

  it('handles USER_VOTED', () => {
    const vote = 13;
    const action = {
      type: types.USER_VOTED,
      payload: {
        vote
      }
    };

    expect(reducer(undefined, action).get('vote')).to.equal(vote);
  });

  it('handles USER_JOINED_GAME', () => {
    const gameId = 'Game5679';
    const name = 'Derek';

    const action = {
      type: types.USER_JOINED_GAME,
      payload: {
        gameId,
        name
      }
    };
    const expectedOutput = fromJS({
      gameId,
      name,
      vote: undefined
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
  });
});
