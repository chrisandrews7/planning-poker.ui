import { expect } from 'chai';
import { fromJS } from 'immutable';
import { selectAllPlayers } from './players';

describe('Players Selectors', () => {
  describe('selectAllPlayers()', () => {
    it('returns a full list of all players', () => {
      expect(selectAllPlayers(fromJS({
        players: {
          1234: {
            name: 'Dave',
            vote: 10
          },
          4567: {
            name: 'Steve',
            vote: 5
          }
        }
      }))).to.deep.equal({
        1234: {
          name: 'Dave',
          vote: 10
        },
        4567: {
          name: 'Steve',
          vote: 5
        }
      });
    });
  });
});
