import db from '../db';
import config from 'config';
import keys from '../utils/keys';

const EXPIRY = config.get('expiry.players');

function addPlayer(gameId, playerId) {
    return new Promise((resolve, reject) => {
        const key = keys.players(gameId);

        db.multi()
            .sadd(key, playerId)
            .expire(key, EXPIRY)
            .exec((err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
    });
}

function removePlayer(gameId, playerId) {
    return new Promise((resolve, reject) => {
        const key = keys.players(gameId);

        db.srem(key, playerId, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}

function getPlayers(gameId) {
    return new Promise((resolve, reject) => {
        const key = keys.players(gameId);

        db.smembers(key, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}

export default {
    addPlayer,
    removePlayer,
    getPlayers
}
