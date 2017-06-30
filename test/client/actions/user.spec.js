import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import idGenerator from '../../../src/client/utils/idGenerator';
import actions from '../../../src/client/actions/user';
import * as types from '../../../src/client/constants/actionTypes';

describe('User Actions', () => {
  it('setUser should create SET_USER action', () => {
    const name = faker.name.firstName();
    const expectedOutput = {
      type: types.SET_USER,
      name
    };

    expect(actions.setUser(name)).to.deep.equal(expectedOutput);
  });

  it('setRoom should create SET_ROOM action', () => {
    const room = faker.random.number();
    const expectedOutput = {
      type: types.SET_ROOM,
      room
    };

    expect(actions.setRoom(room)).to.deep.equal(expectedOutput);
  });

  it('startNewRoom should create SET_ROOM action with a random ID', () => {
    const room = faker.random.number();
    sinon
      .stub(idGenerator, 'generateShortId')
      .returns(room);

    const expectedOutput = {
      type: types.SET_ROOM,
      room
    };

    expect(actions.startNewRoom()).to.deep.equal(expectedOutput);
  });
});
