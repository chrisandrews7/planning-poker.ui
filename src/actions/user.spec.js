import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import * as idGenerator from '../utils/idGenerator';
import {
  setUser,
  setGame,
  startNewGame
} from './user';
import {
  SET_GAME,
  SET_USER
} from '../constants/actionTypes';

describe('User Actions', () => {
  it('setUser() should create SET_USER action', () => {
    const name = faker.name.firstName();
    const expectedOutput = {
      type: SET_USER,
      name
    };

    expect(setUser(name)).to.deep.equal(expectedOutput);
  });

  it('setRoom() should create SET_GAME action', () => {
    const gameId = faker.random.number();
    const expectedOutput = {
      type: SET_GAME,
      gameId,
      redirect: gameId
    };

    expect(setGame(gameId)).to.deep.equal(expectedOutput);
  });

  it('startNewRoom() should create SET_GAME action with a random ID', () => {
    const gameId = faker.random.number();
    sinon
      .stub(idGenerator, 'generateShortId')
      .returns(gameId);

    const expectedOutput = {
      type: SET_GAME,
      gameId,
      redirect: gameId
    };

    expect(startNewGame()).to.deep.equal(expectedOutput);
  });
});
