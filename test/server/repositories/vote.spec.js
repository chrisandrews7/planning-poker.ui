import { expect } from 'chai';
import config from 'config';
import faker from 'faker';
import sinon from 'sinon';
import keys from '../../../src/server/utils/keys';
import voteRepository from '../../../src/server/repositories/vote';
import client from '../../fixtures/mock/db';

voteRepository.__Rewire__('db', client);

describe('Vote Repository', () => {
  let params;
  let key;
  let sandbox;

  after(() => {
    voteRepository.__ResetDependency__('db');
  });

  before(() => {
    sandbox = sinon.sandbox.create();
    params = {
      gameId: faker.random.number(),
      playerId: faker.name.firstName(),
      vote: faker.random.number(10)
    };
    key = keys.votes(params.gameId);
  });

  afterEach((done) => {
    client.flushdb(() => {
      done();
    });
    sandbox.restore();
  });

  describe('Set Vote', () => {
    it('should set the vote record using the vote key', (done) => {
      const expectedResult = {
        [params.playerId]: String(params.vote)
      };

      voteRepository.setVote(params.gameId, params.playerId, params.vote)
        .then(() => {
          client.hgetall(key, (err, res) => {
            expect(res).to.deep.equal(expectedResult);
            done();
          });
        });
    });

    it('should set the expiry on the vote record', (done) => {
      const expectedTtl = config.get('expiry.votes');

      voteRepository.setVote(params.gameId, params.playerId, params.vote)
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
        hmset: sandbox.stub().returnsThis(),
        expire: sandbox.stub().returnsThis()
      });

      voteRepository.setVote(params.gameId, params.playerId, params.vote)
        .catch((error) => {
          expect(error).to.equal('error');
          done();
        });
    });
  });

  describe('Get Votes', () => {
    it('should return the vote records', (done) => {
      const expectedTtl = config.get('expiry.votes');

      const expectedResult = {
        [params.playerId]: String(params.vote)
      };

      client.multi()
        .hmset(key, params.playerId, params.vote)
        .expire(key, expectedTtl)
        .exec(() => {
          voteRepository.getVotes(params.gameId)
          .then((results) => {
            expect(results).to.deep.equal(expectedResult);
            done();
          });
        });
    });

    it('should return an empty object if no records exist', (done) => {
      voteRepository.getVotes(params.gameId)
        .then((results) => {
          expect(results).to.deep.equal({});
          done();
        });
    });

    it('should reject a promise if the db execution fails', (done) => {
      sandbox.stub(client, 'hgetall').yields('error');

      voteRepository.getVotes(params.gameId)
        .catch((error) => {
          expect(error).to.equal('error');
          done();
        });
    });
  });
});
