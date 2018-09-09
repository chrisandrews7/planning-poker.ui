import { expect } from 'chai';
import faker from 'faker';
import { Map, fromJS } from 'immutable';
import reducer from './user';
import * as types from '../constants/actionTypes';

describe('User Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(Map({
      name: undefined,
      vote: undefined,
      gameId: undefined,
      connected: false
    }));
  });

  it('should handle USER_VOTED', () => {
    const vote = faker.random.number();
    const action = {
      type: types.USER_VOTED,
      payload: {
        vote
      }
    };

    expect(reducer(undefined, action).get('vote')).to.equal(vote);
  });

  it('should handle USER_JOINED_GAME', () => {
    const gameId = faker.random.uuid();
    const name = faker.name.firstName();

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
      vote: undefined,
      connected: true
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
  });
});
