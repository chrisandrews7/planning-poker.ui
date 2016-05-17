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
});
