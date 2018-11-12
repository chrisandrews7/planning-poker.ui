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

  it('handles USER_JOINING_GAME', () => {
    const gameId = 'Game5679';
    const name = 'Derek';

    const action = {
      type: types.USER_JOINING_GAME,
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

  it('handles SOCKET_LOADING', () => {
    const action = {
      type: types.SOCKET_LOADING
    };

    expect(reducer(undefined, action).get('loading')).to.be.true;
  });

  it('handles SOCKET_CONNECTED', () => {
    const action = {
      type: types.SOCKET_CONNECTED
    };

    expect(reducer(Map({ loading: true }), action).get('loading')).to.be.false;
  });
});
