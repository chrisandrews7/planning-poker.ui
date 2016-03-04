import db from '../db';
import termConstants from '../constants/terms';

const keys = {
  vote: (gameId, playerId) => `${termConstants.GAME}:${gameId}:${termConstants.PLAYER}:${playerId}`
};

export function setVote(gameId, playerId, vote) {
  return new Promise((resolve, reject) => {
    db.set(keys.vote(gameId, playerId), vote, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

export function getVotes(gameId, playerId) {
  return new Promise((resolve, reject) => {
    db.get(keys.vote(gameId, playerId), (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}
