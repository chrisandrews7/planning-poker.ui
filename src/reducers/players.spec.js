import { expect } from 'chai';
import faker from 'faker';
import { Map, fromJS } from 'immutable';
import reducer from './players';
import * as types from '../constants/actionTypes';

describe('Players Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(Map());
  });

  it('should handle PLAYER_JOINED', () => {
    const id = faker.random.uuid();
    const name = faker.name.firstName();
    const vote = faker.random.number();

    const action = {
      type: types.PLAYER_JOINED,
      payload: {
        id,
        name,
        vote
      }
    };
    const expectedOutput = fromJS({
      [id]: {
        name,
        vote
      }
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
  });

  it('should handle PLAYER_LEFT', () => {
    const id = faker.random.uuid();
    const initialState = fromJS({
      [id]: {
        name: faker.name.firstName()
      }
    });

    const action = {
      type: types.PLAYER_LEFT,
      payload: {
        id
      }
    };

    expect(reducer(initialState, action).has(id)).to.be.false;
  });

  it('should handle PLAYER_VOTED', () => {
    const id = faker.random.uuid();
    const vote = faker.random.number();

    const initialState = fromJS({
      [id]: {
        name: faker.name.firstName(),
        vote: undefined
      }
    });

    const action = {
      type: types.PLAYER_VOTED,
      payload: {
        id,
        vote
      }
    };

    expect(reducer(initialState, action).getIn([id, 'vote'])).to.equal(vote);
  });
});
