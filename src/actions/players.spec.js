import { expect } from 'chai';
import faker from 'faker';
import {
  removePlayer,
  updatePlayer
} from './players';
import {
  REMOVE_PLAYER,
  UPDATE_PLAYER
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

  it('updatePlayer() should create UPDATE_PLAYER action', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const expectedOutput = {
      type: UPDATE_PLAYER,
      payload: {
        name,
        vote
      }
    };

    expect(updatePlayer(name, vote)).to.deep.equal(expectedOutput);
  });
});
