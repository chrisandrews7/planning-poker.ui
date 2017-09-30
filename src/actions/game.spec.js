import { expect } from 'chai';
import faker from 'faker';
import { stub } from 'sinon';
import * as idGenerator from '../utils/idGenerator';
import {
  setGame,
  setRandomGame,
  join
} from './game';
import {
  SET_GAME,
  JOIN_GAME
} from '../constants/actionTypes';
import { JOIN } from '../constants/eventTypes';

describe('Game Actions', () => {
  it('setRoom() should create SET_GAME action', () => {
    const id = faker.random.number();
    const expectedOutput = {
      type: SET_GAME,
      payload: {
        id
      }
    };

    expect(setGame(id)).to.deep.equal(expectedOutput);
  });

  it('setRandomGame() should create SET_GAME action with a random ID', () => {
    const id = faker.random.number();
    stub(idGenerator, 'generateShortId').returns(id);

    const expectedOutput = {
      type: SET_GAME,
      payload: {
        id
      }
    };

    expect(setRandomGame()).to.deep.equal(expectedOutput);
  });

  it('join() should create JOIN_GAME action', () => {
    const id = faker.random.number();
    const name = faker.name.firstName();
    const expectedOutput = {
      type: JOIN_GAME,
      meta: {
        redirect: `/${id}`,
        emit: {
          type: JOIN,
          params: {
            playerId: name,
            gameId: id
          }
        }
      }
    };

    expect(join(id, name)).to.deep.equal(expectedOutput);
  });
});
