import { expect } from 'chai';
import sinon from 'sinon';
import config from 'config';
import faker from 'faker';
import redis from 'redis';
import keys from '../../../utils/keys';

describe('Player Model', () => {
    let client;
    let key;
    let params;
    let playerModel;

    before(() => {
        //sinon.stub(redis, 'createClient', fakeredis.createClient);
        playerModel = require('../../../models/player');
        //client = redis.createClient('test');
        client = require('../../../db');
    });

    after(() => {
        // redis.createClient.restore();
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
    });

    describe('addPlayer', () => {
        it('should add the player id to the current game players set', (done) => {
            const expectedResult = [params.playerId];

            playerModel.addPlayer(params.gameId, params.playerId)
                .then(() => {
                    client.smembers(key, (err, res) => {
                        expect(res).to.deep.equal(expectedResult);
                        done();
                    });
                });
        });

        it('should set the expiry on the players record', (done) => {
            const expectedTtl = config.get('expiry.players');

            playerModel.addPlayer(params.gameId, params.playerId)
                .then(() => {
                    client.ttl(key, (err, res) => {
                        expect(res).to.equal(expectedTtl);
                        done();
                    });
                });
        });
    });

    describe('getPlayers', () => {
        it('should return the player set record', (done) => {
            const expectedTtl = config.get('expiry.players');
            const expectedResult = [params.playerId];

            client.multi()
                .sadd(key, params.playerId)
                .expire(key, expectedTtl)
                .exec((err, res) => {
                    playerModel.getPlayers(params.gameId)
                        .then((results) => {
                            expect(results).to.deep.equal(expectedResult);
                            done();
                        });
                });
        });
    });

    describe('removePlayer', () => {
        it('should remove a player from the player set record', (done) => {
            const expectedTtl = config.get('expiry.players');
            const playerToChange = 'anotherTestPlayer';
            const expectedResult = [params.playerId];

            client.multi()
                .sadd(key, params.playerId, playerToChange)
                .expire(key, expectedTtl)
                .exec((err, res) => {
                    playerModel.removePlayer(params.gameId, playerToChange)
                        .then((results) => {
                            client.smembers(key, (err, result) => {
                                expect(result).to.deep.equal(expectedResult);
                                done();
                            });
                        });
                });
        });
    });
});
