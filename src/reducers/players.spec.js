import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import reducer from './players';
import * as types from '../constants/actionTypes';

describe('Players Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.equal(Map());
  });

  it('handles PLAYER_JOINED', () => {
    const id = '123456';
    const name = 'Susan';
    const vote = 20;

    const action = {
      type: types.PLAYER_JOINED,
      payload: {
        id,
        name,
        vote
      }
    };
    const expectedOutput = fromJS({
      [id]: {
        id,
        name,
        vote
      }
    });

    expect(reducer(undefined, action).equals(expectedOutput)).to.be.true;
  });

  it('should handle PLAYER_LEFT', () => {
    const id = '45678';
    const initialState = fromJS({
      [id]: {
        name: 'Julie'
      }
    });

    const action = {
      type: types.PLAYER_LEFT,
      payload: {
        id
      }
    };

    expect(reducer(initialState, action).has(id)).to.be.false;
  });

  it('should handle PLAYER_VOTED', () => {
    const id = '987654';
    const vote = 13;

    const initialState = fromJS({
      [id]: {
        name: 'Brian',
        vote: undefined
      }
    });

    const action = {
      type: types.PLAYER_VOTED,
      payload: {
        id,
        vote
      }
    };

    expect(reducer(initialState, action).getIn([id, 'vote'])).to.equal(vote);
  });
});
