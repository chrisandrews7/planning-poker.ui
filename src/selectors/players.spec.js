import { expect } from 'chai';
import { Map } from 'immutable';
import { selectAllPlayers } from './players';

describe('Players Selectors', () => {
  describe('selectAllPlayers()', () => {
    it('should return a full list of all players', () => {
      expect(selectAllPlayers(Map({
        game: Map({
          board: {
            1234: {
              name: 'Dave',
              vote: 10
            }
          }
        })
      }))).to.deep.equal({
        1234: {
          name: 'Dave',
          vote: 10
        }
      });
    });
  });
});
