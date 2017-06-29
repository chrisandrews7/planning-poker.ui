import { expect } from 'chai';
import faker from 'faker';
import { Map } from 'immutable';
import reducer from '../../../src/client/reducers/user';
import * as types from '../../../src/client/constants/actionTypes';

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

  it('should handle SET_ROOM', () => {
    const room = faker.lorem.word();
    const action = {
      type: types.SET_ROOM,
      room
    };

    expect(reducer(undefined, action).get('room')).to.equal(room);
  });
});
