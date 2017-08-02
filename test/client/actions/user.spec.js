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

  it('setRoom should create SET_GAME action', () => {
    const gameId = faker.random.number();
    const expectedOutput = {
      type: types.SET_GAME,
      gameId,
      redirect: gameId
    };

    expect(actions.setGame(gameId)).to.deep.equal(expectedOutput);
  });

  it('startNewRoom should create SET_GAME action with a random ID', () => {
    const gameId = faker.random.number();
    sinon
      .stub(idGenerator, 'generateShortId')
      .returns(gameId);

    const expectedOutput = {
      type: types.SET_GAME,
      gameId,
      redirect: gameId
    };

    expect(actions.startNewGame()).to.deep.equal(expectedOutput);
  });
});
