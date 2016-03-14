import { VOTES_UPDATED, PLAYER_JOINED, PLAYER_LEFT, ERROR } from '../../shared/constants/events';
import voteModel from '../models/vote';
import playerModel from '../models/player';

async function join(gameId, playerId) {
    try {
        this.join(gameId);
        await playerModel.addPlayer(gameId, playerId);
        this.broadcast.to(gameId).emit(PLAYER_JOINED, {playerId: playerId});
    } catch (exception) {
        this.emit(ERROR, exception);
    }
}

async function leave(gameId, playerId) {
    try {
        this.leave(gameId);
        await playerModel.removePlayer(gameId, playerId);
        this.broadcast.to(gameId).emit(PLAYER_LEFT, {playerId: playerId});
    } catch (exception) {
        this.emit(ERROR, exception);
    }
}

export default {
    join,
    leave
};
