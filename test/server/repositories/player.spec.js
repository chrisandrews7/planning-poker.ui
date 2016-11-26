import { expect } from 'chai';
import config from 'config';
import sinon from 'sinon';
import faker from 'faker';
import keys from '../../../src/server/utils/keys';
import client from '../../fixtures/mock/db';
import playerRepository from '../../../src/server/repositories/player';

playerRepository.__Rewire__('db', client);

describe('Player Repository', () => {
  let key;
  let params;
  let sandbox;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  after(() => {
    playerRepository.__ResetDependency__('db');
  });

  beforeEach(() => {
    params = {
      gameId: faker.random.number(),
      playerId: faker.name.firstName()
    };
    key = keys.players(params.gameId);
  });

  afterEach((done) => {
    client.flushdb(() => {
      done();
    });
    sandbox.restore();
  });

  describe('Add Player', () => {
    it('should add the player id to the current game players set', (done) => {
      const expectedResult = [params.playerId];

      playerRepository.addPlayer(params.gameId, params.playerId)
      .then(() => {
        client.smembers(key, (err, res) => {
          expect(res).to.deep.equal(expectedResult);
          done();
        });
      });
    });

    it('should set the expiry on the players record', (done) => {
      const expectedTtl = config.get('expiry.players');

      playerRepository.addPlayer(params.gameId, params.playerId)
        .then(() => {
          client.ttl(key, (err, res) => {
            expect(res).to.equal(expectedTtl);
            done();
          });
        });
    });

    it('should reject a promise if the db execution fails', (done) => {
      sandbox.stub(client, 'multi').returns({
        exec: sandbox.stub().yields('error'),
        sadd: sandbox.stub().returnsThis(),
        expire: sandbox.stub().returnsThis()
      });

      playerRepository.addPlayer(params.gameId, params.playerId)
        .catch((error) => {
          expect(error).to.equal('error');
          done();
        });
    });
  });

  describe('Get Players', () => {
    it('should return the player set record', (done) => {
      const expectedTtl = config.get('expiry.players');
      const expectedResult = [params.playerId];

      client.multi()
        .sadd(key, params.playerId)
        .expire(key, expectedTtl)
        .exec(() => {
          playerRepository.getPlayers(params.gameId)
          .then((results) => {
            expect(results).to.deep.equal(expectedResult);
            done();
          });
        });
    });

    it('should reject a promise if the db execution fails', (done) => {
      sandbox.stub(client, 'smembers').yields('error');

      playerRepository.getPlayers(params.gameId)
        .catch((error) => {
          expect(error).to.equal('error');
          done();
        });
    });
  });

  describe('Remove Player', () => {
    it('should remove a player from the player set record', (done) => {
      const expectedTtl = config.get('expiry.players');
      const playerToChange = 'anotherTestPlayer';
      const expectedResult = [params.playerId];

      client.multi()
        .sadd(key, params.playerId, playerToChange)
        .expire(key, expectedTtl)
        .exec(() => {
          playerRepository.removePlayer(params.gameId, playerToChange)
          .then(() => {
            client.smembers(key, (err, result) => {
              expect(result).to.deep.equal(expectedResult);
              done();
            });
          });
        });
    });

    it('should reject a promise if the db execution fails', (done) => {
      const playerToChange = 'aTestPlayer';
      sandbox.stub(client, 'srem').yields('error');

      playerRepository.removePlayer(params.gameId, playerToChange)
        .catch((error) => {
          expect(error).to.equal('error');
          done();
        });
    });
  });
});
