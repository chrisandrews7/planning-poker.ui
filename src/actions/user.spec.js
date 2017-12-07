import { expect } from 'chai';
import { fromJS } from 'immutable';
import faker from 'faker';
import { stub } from 'sinon';
import * as idGenerator from '../utils/idGenerator';
import { JOIN, VOTE } from '../constants/eventTypes';
import {
  setUser,
  setVote,
  setGame,
  setRandomGame,
  join
} from './user';
import {
  SET_USER,
  SET_VOTE,
  SET_GAME,
  JOIN_GAME
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
    const gameId = faker.random.number();
    const name = faker.name.firstName();
    const vote = faker.random.number();

    const state = fromJS({
      user: {
        name,
        gameId
      }
    });
    const expectedOutput = {
      type: SET_VOTE,
      payload: {
        vote
      },
      meta: {
        emit: {
          type: VOTE,
          params: {
            vote,
            playerId: name,
            gameId
          }
        }
      }
    };

    expect(setVote(vote)(state)).to.deep.equal(expectedOutput);
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

  it('setRandomGame() should create SET_GAME action with a random ID', () => {
    const gameId = faker.random.number();
    stub(idGenerator, 'generateShortId').returns(gameId);

    const expectedOutput = {
      type: SET_GAME,
      payload: {
        gameId
      }
    };

    expect(setRandomGame()).to.deep.equal(expectedOutput);
  });

  it('join() should create JOIN_GAME action', () => {
    const gameId = faker.random.number();
    const name = faker.name.firstName();

    const state = fromJS({
      user: {
        name,
        gameId
      }
    });

    const expectedOutput = {
      type: JOIN_GAME,
      meta: {
        emit: {
          type: JOIN,
          params: {
            playerId: name,
            gameId
          }
        }
      }
    };

    expect(join(gameId, name)(state)).to.deep.equal(expectedOutput);
  });
});
