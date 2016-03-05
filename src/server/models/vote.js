import db from '../db';
import config from 'config';
import keys from '../utils/keys';

const EXPIRY = config.get('expiry.vote');

function setVote(gameId, playerId, vote) {
    return new Promise((resolve, reject) => {
        const key = keys.votes(gameId);

        db.multi()
            .hmset(key, playerId, vote)
            .expire(key, EXPIRY)
            .exec((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });
}

function getVotes(gameId) {
    return new Promise((resolve, reject) => {
        const key = keys.votes(gameId);

        db.hgetall(key, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

export default {
    getVotes,
    setVote
}