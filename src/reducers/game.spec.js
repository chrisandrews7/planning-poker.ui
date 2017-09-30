import { expect } from 'chai';
import faker from 'faker';
import { Map } from 'immutable';
import reducer from './game';
import * as types from '../constants/actionTypes';

describe('Game Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(Map({
      id: undefined
    }));
  });

  it('should handle SET_GAME', () => {
    const id = faker.random.number();
    const action = {
      type: types.SET_GAME,
      payload: {
        id
      }
    };

    expect(reducer(undefined, action).get('id')).to.equal(id);
  });
});
