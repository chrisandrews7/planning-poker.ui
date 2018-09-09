import { expect } from 'chai';
import {
  newPlayer,
  removePlayer,
  playerVote
} from './players';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  PLAYER_VOTED
} from '../constants/actionTypes';

describe('Player Actions', () => {
  it('newPlayer() should create PLAYER_JOINED action', () => {
    const id = 12345;
    const name = 'Susan';
    const vote = 5;


    expect(newPlayer({
      id,
      name,
      vote
    })).to.deep.equal({
      type: PLAYER_JOINED,
      payload: {
        id,
        name,
        vote
      }
    });
  });

  it('removePlayer() should create PLAYER_LEFT action', () => {
    const id = 12345;

    expect(removePlayer({ id })).to.deep.equal({
      type: PLAYER_LEFT,
      payload: {
        id
      }
    });
  });


  it('playerVote() should create PLAYER_VOTED action', () => {
    const id = 12345;
    const vote = 10;

    expect(playerVote({
      id,
      vote
    })).to.deep.equal({
      type: PLAYER_VOTED,
      payload: {
        id,
        vote
      }
    });
  });
});
