import { expect } from 'chai';
import faker from 'faker';
import {
  removePlayer,
  updateVote
} from './players';
import {
  REMOVE_PLAYER,
  UPDATE_VOTE
} from '../constants/actionTypes';

describe('Player Actions', () => {
  it('removePlayer() should create REMOVE_PLAYER action', () => {
    const name = faker.name.firstName();
    const expectedOutput = {
      type: REMOVE_PLAYER,
      payload: {
        name
      }
    };

    expect(removePlayer(name)).to.deep.equal(expectedOutput);
  });

  it('updateVote() should create UPDATE_VOTE action', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const expectedOutput = {
      type: UPDATE_VOTE,
      payload: {
        name,
        vote
      }
    };

    expect(updateVote(name, vote)).to.deep.equal(expectedOutput);
  });
});
