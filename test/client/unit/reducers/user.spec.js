import { expect } from 'chai';
import faker from 'faker';
import { Map, fromJS } from 'immutable';
import reducer from '../../../../src/client/reducers/user';
import * as types from '../../../../src/client/constants/actionTypes';

describe('User Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(Map());
  });

  it('should handle SET_USER', () => {
    const id = faker.name.firstName();
    const action = {
      type: types.SET_USER,
      id
    };
    const expectedOutput = fromJS({
      id
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
  });
});
