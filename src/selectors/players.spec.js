import { expect } from 'chai';
import { fromJS } from 'immutable';
import { selectAllPlayers } from './players';

describe('Players Selectors', () => {
  describe('selectAllPlayers()', () => {
    it('should return a full list of all players including the user', () => {
      expect(selectAllPlayers(fromJS({
        players: {
          Dave: {
            name: 'Dave',
            vote: 10
          }
        },
        user: {
          name: 'Steve',
          vote: 5
        }
      }))).to.deep.equal({
        Dave: {
          name: 'Dave',
          vote: 10
        },
        Steve: {
          name: 'Steve',
          vote: 5
        }
      });
    });
  });
});
