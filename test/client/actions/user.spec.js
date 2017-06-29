import { expect } from 'chai';
import faker from 'faker';
import * as actions from '../../../src/client/actions/user';
import * as types from '../../../src/client/constants/actionTypes';

describe('User Actions', () => {
  it('should handle SET_USER', () => {
    const name = faker.name.firstName();
    const expectedOutput = {
      type: types.SET_USER,
      name
    };

    expect(actions.setUser(name)).to.deep.equal(expectedOutput);
  });

  it('should handle SET_ROOM', () => {
    const room = faker.lorem.word();
    const expectedOutput = {
      type: types.SET_ROOM,
      room
    };

    expect(actions.setRoom(room)).to.deep.equal(expectedOutput);
  });
});
