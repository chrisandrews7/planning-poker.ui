import { expect } from 'chai';
import faker from 'faker';
import * as actions from '../../../../src/client/actions/user';
import * as types from '../../../../src/client/constants/actionTypes';

describe('User Actions', () => {
  it('setUser should create SET_USER action', () => {
    const id = faker.name.firstName();
    const expectedOutput = {
      type: types.SET_USER,
      id
    };

    expect(actions.setUser(id)).to.deep.equal(expectedOutput);
  });
});
