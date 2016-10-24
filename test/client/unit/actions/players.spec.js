import { expect } from 'chai';
import faker from 'faker';
import * as actions from '../../../../src/client/actions/players';
import * as types from '../../../../src/client/constants/actionTypes';

describe('Player Actions', () => {
  it('addPlayer should create ADD_PLAYER action', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const expectedOutput = {
      type: types.ADD_PLAYER,
      name,
      vote
    };

    expect(actions.addPlayer(name, vote)).to.deep.equal(expectedOutput);
  });

  it('removePlayer should create REMOVE_PLAYER action', () => {
    const name = faker.name.firstName();
    const expectedOutput = {
      type: types.REMOVE_PLAYER,
      name
    };

    expect(actions.removePlayer(name)).to.deep.equal(expectedOutput);
  });

  it('updateVote should create UPDATE_VOTE action', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const expectedOutput = {
      type: types.UPDATE_VOTE,
      name,
      vote
    };

    expect(actions.updateVote(name, vote)).to.deep.equal(expectedOutput);
  });
});
