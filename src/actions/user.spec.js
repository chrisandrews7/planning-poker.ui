import { expect } from 'chai';
import { USER_JOINED_GAME, USER_VOTED } from '../constants/actionTypes';
import { setVote, joinGame } from './user';

describe('User Actions', () => {
  it('setVote() should create USER_VOTED action', () => {
    const vote = 13;

    expect(setVote(vote)).to.deep.equal({
      type: USER_VOTED,
      payload: {
        vote
      }
    });
  });

  it('joinGame() should create USER_JOINED_GAME action', () => {
    const gameId = 12345;
    const name = 'Herbert';

    expect(joinGame({ gameId, name })).to.deep.equal({
      type: USER_JOINED_GAME,
      payload: {
        gameId,
        name
      }
    });
  });
});
