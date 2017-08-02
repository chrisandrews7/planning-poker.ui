import { expect } from 'chai';
import faker from 'faker';
import { Map } from 'immutable';
import reducer from './user';
import * as types from '../constants/actionTypes';

describe('User Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(Map());
  });

  it('should handle SET_USER', () => {
    const name = faker.name.firstName();
    const action = {
      type: types.SET_USER,
      name
    };

    expect(reducer(undefined, action).get('name')).to.equal(name);
  });

  it('should handle SET_GAME', () => {
    const gameId = faker.random.number();
    const action = {
      type: types.SET_GAME,
      gameId
    };

    expect(reducer(undefined, action).get('gameId')).to.equal(gameId);
  });
});
