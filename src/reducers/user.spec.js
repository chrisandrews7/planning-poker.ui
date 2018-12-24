import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import reducer from './user';
import * as types from '../constants/actionTypes';

describe('User Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(Map({
      name: undefined,
      vote: undefined,
      gameId: undefined,
      loading: false
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

  it('handles JOINING_GAME', () => {
    const gameId = 'Game5679';
    const name = 'Derek';

    const action = {
      type: types.JOINING_GAME,
      payload: {
        gameId,
        name
      }
    };
    const expectedOutput = fromJS({
      gameId,
      name,
      vote: undefined,
      loading: true
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
  });

  it('handles CONNECTION_LOST', () => {
    const action = {
      type: types.CONNECTION_LOST
    };

    expect(reducer(undefined, action).get('loading')).to.be.true;
  });

  it('handles JOINED_GAME', () => {
    const action = {
      type: types.JOINED_GAME
    };

    expect(reducer(Map({ loading: true }), action).get('loading')).to.be.false;
  });
});
