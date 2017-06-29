import { expect } from 'chai';
import faker from 'faker';
import { Map, fromJS } from 'immutable';
import reducer from '../../../src/client/reducers/players';
import * as types from '../../../src/client/constants/actionTypes';

describe('Players Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(Map());
  });

  it('should handle ADD_PLAYER', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const action = {
      type: types.ADD_PLAYER,
      name,
      vote
    };
    const expectedOutput = fromJS({
      [name]: {
        name,
        vote
      }
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
  });

  it('should handle SET_USER', () => {
    const name = faker.name.firstName();
    const action = {
      type: types.SET_USER,
      name
    };
    const expectedOutput = fromJS({
      [name]: {
        name,
        vote: undefined
      }
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
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
      name
    };

    expect(reducer(initialState, action).has(name)).to.be.false;
  });

  it('should handle UPDATE_VOTE', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();

    const initialState = fromJS({
      [name]: {
        name,
        vote: faker.random.number()
      }
    });

    const action = {
      type: types.UPDATE_VOTE,
      name,
      vote
    };

    expect(reducer(initialState, action).getIn([name, 'vote'])).to.equal(vote);
  });
});
