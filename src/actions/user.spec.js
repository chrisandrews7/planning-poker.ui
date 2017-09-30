import { expect } from 'chai';
import faker from 'faker';
import {
  setUser,
  setVote
} from './user';
import {
  SET_USER,
  SET_VOTE
} from '../constants/actionTypes';

describe('User Actions', () => {
  it('setUser() should create SET_USER action', () => {
    const name = faker.name.firstName();
    const expectedOutput = {
      type: SET_USER,
      payload: {
        name
      }
    };

    expect(setUser(name)).to.deep.equal(expectedOutput);
  });

  it('setVote() should create SET_VOTE action', () => {
    const vote = faker.random.number();
    const expectedOutput = {
      type: SET_VOTE,
      payload: {
        vote
      }
    };

    expect(setVote(vote)).to.deep.equal(expectedOutput);
  });
});
