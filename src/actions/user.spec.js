import { expect } from 'chai';
import faker from 'faker';
import { stub } from 'sinon';
import * as idGenerator from '../utils/idGenerator';
import {
  setUser,
  setGame,
  startNewGame,
  setVote
} from './user';
import {
  SET_GAME,
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

  it('setRoom() should create SET_GAME action', () => {
    const gameId = faker.random.number();
    const expectedOutput = {
      type: SET_GAME,
      payload: {
        gameId
      }
    };

    expect(setGame(gameId)).to.deep.equal(expectedOutput);
  });

  it('startNewRoom() should create SET_GAME action with a random ID', () => {
    const gameId = faker.random.number();
    stub(idGenerator, 'generateShortId').returns(gameId);

    const expectedOutput = {
      type: SET_GAME,
      payload: {
        gameId
      }
    };

    expect(startNewGame()).to.deep.equal(expectedOutput);
  });
});
