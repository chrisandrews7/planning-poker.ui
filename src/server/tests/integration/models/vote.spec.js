import { expect } from 'chai';
import sinon from 'sinon';
import config from 'config';
import faker from 'faker';
import redis from 'redis';
import keys from '../../../utils/keys';

describe('Vote Model', () => {
    let client;
    let params;
    let voteModel;
    let key;

    before(() => {
        //sinon.stub(redis, 'createClient', fakeredis.createClient);
        voteModel = require('../../../models/vote');
        //client = redis.createClient('test');
        client = require('../../../db');
    });

    after(() => {
        // redis.createClient.restore();
    });

    beforeEach(() => {
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
    });

    describe('setVote', () => {
        it('should set the vote record using the vote key', (done) => {
            const expectedResult = {};
            expectedResult[params.playerId] = String(params.vote);

            voteModel.setVote(params.gameId, params.playerId, params.vote)
                .then(() => {
                    client.hgetall(key, (err, res) => {
                        expect(res).to.deep.equal(expectedResult);
                        done();
                    });
                });
        });

        it('should set the expiry on the vote record', (done) => {
            const expectedTtl = config.get('expiry.votes');

            voteModel.setVote(params.gameId, params.playerId, params.vote)
                .then(() => {
                    client.ttl(key, (err, res) => {
                        expect(res).to.equal(expectedTtl);
                        done();
                    });
                });
        });
    });

    describe('getVotes', () => {
        it('should return the vote records', (done) => {
            const expectedTtl = config.get('expiry.votes');

            const expectedResult = {};
            expectedResult[params.playerId] = String(params.vote);

            client.multi()
                .hmset(key, params.playerId, params.vote)
                .expire(key, expectedTtl)
                .exec((err, res) => {
                    voteModel.getVotes(params.gameId)
                        .then((results) => {
                            expect(results).to.deep.equal(expectedResult);
                            done();
                        });
                });
        });
    });
});
