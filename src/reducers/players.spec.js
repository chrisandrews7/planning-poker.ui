import { expect } from 'chai';
import faker from 'faker';
import { Map, fromJS } from 'immutable';
import reducer from './players';
import * as types from '../constants/actionTypes';

describe('Players Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(Map());
  });

  it('should handle REMOVE_PLAYER', () => {
    const name = faker.name.firstName();
    const initialState = fromJS({
      [name]: {
        name,
        vote: faker.random.number()
      }
    });

    const action = {
      type: types.REMOVE_PLAYER,
      payload: {
        name
      }
    };

    expect(reducer(initialState, action).has(name)).to.be.false;
  });

  it('should handle UPDATE_PLAYER', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const action = {
      type: types.UPDATE_PLAYER,
      payload: {
        name,
        vote
      }
    };
    const expectedOutput = fromJS({
      [name]: {
        name,
        vote
      }
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
  });
});
