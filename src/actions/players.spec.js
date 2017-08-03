import { expect } from 'chai';
import faker from 'faker';
import {
  addPlayer,
  removePlayer,
  updateVote
} from './players';
import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_VOTE
} from '../constants/actionTypes';

describe('Player Actions', () => {
  it('addPlayer() should create ADD_PLAYER action', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const expectedOutput = {
      type: ADD_PLAYER,
      name,
      vote
    };

    expect(addPlayer(name, vote)).to.deep.equal(expectedOutput);
  });

  it('removePlayer() should create REMOVE_PLAYER action', () => {
    const name = faker.name.firstName();
    const expectedOutput = {
      type: REMOVE_PLAYER,
      name
    };

    expect(removePlayer(name)).to.deep.equal(expectedOutput);
  });

  it('updateVote() should create UPDATE_VOTE action', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const expectedOutput = {
      type: UPDATE_VOTE,
      name,
      vote
    };

    expect(updateVote(name, vote)).to.deep.equal(expectedOutput);
  });
});
