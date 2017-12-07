import { expect } from 'chai';
import faker from 'faker';
import { Map } from 'immutable';
import reducer from './user';
import * as types from '../constants/actionTypes';

describe('User Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(Map({
      name: undefined,
      vote: undefined,
      gameId: undefined,
      loading: false
    }));
  });

  it('should handle SET_USER', () => {
    const name = faker.name.firstName();
    const action = {
      type: types.SET_USER,
      payload: {
        name
      }
    };

    expect(reducer(undefined, action).get('name')).to.equal(name);
  });

  it('should handle SET_VOTE', () => {
    const vote = faker.random.number();
    const action = {
      type: types.SET_VOTE,
      payload: {
        vote
      }
    };

    expect(reducer(undefined, action).get('vote')).to.equal(vote);
  });

  it('should handle SET_GAME', () => {
    const gameId = faker.random.number();
    const action = {
      type: types.SET_GAME,
      payload: {
        gameId
      }
    };

    expect(reducer(undefined, action).get('gameId')).to.equal(gameId);
  });

  it('should handle JOIN_GAME', () => {
    const action = {
      type: types.JOIN_GAME
    };

    expect(reducer(undefined, action).get('loading')).to.be.true;
  });
});
