import { expect } from 'chai';
import sinon from 'sinon';
import config from 'config';
import faker from 'faker';
import keys from '../../../../src/server/utils/keys';
import voteModel from '../../../../src/server/models/vote';
import client from '../../../../src/server/db';

describe('Vote Model', () => {
    let params;
    let key;

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

    describe('Set Vote', () => {
        it('should set the vote record using the vote key', (done) => {
            let expectedResult = {
                [params.playerId]: String(params.vote)
            };

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

    describe('Get Votes', () => {
        it('should return the vote records', (done) => {
            const expectedTtl = config.get('expiry.votes');

            let expectedResult = {
                [params.playerId]: String(params.vote)
            };

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

        it('should return an empty object if no records exist', (done) => {
            voteModel.getVotes(params.gameId)
                .then((results) => {
                    expect(results).to.deep.equal({});
                    done();
                });
        });
    });
});
