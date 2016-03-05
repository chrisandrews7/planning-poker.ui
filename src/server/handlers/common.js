import { VOTES_UPDATED, PLAYERS_UPDATED, ERROR } from '../../shared/constants/events';
import voteModel from '../models/vote';
import playerModel from '../models/player';

async function join(gameId, playerId) {
    try {
        this.join(gameId);
        await playerModel.addPlayer(gameId, playerId);
        const players = await playerModel.getPlayers(gameId);
        this.broadcast.to(gameId).emit(PLAYERS_UPDATED, players);
        // TODO: Remove me
        this.emit(PLAYERS_UPDATED, players);
    } catch (exception) {
        this.emit(ERROR, exception);
    }
}

async function leave(gameId, playerId) {
    try {
        this.leave(gameId);
        await playerModel.removePlayer(gameId, playerId);
        const players = await playerModel.getPlayers(gameId);
        this.broadcast.to(gameId).emit(PLAYERS_UPDATED, players);
        // TODO: Remove me
        this.emit(PLAYERS_UPDATED, players);
    } catch (exception) {
        this.emit(ERROR, exception);
    }
}

export default {
    join,
    leave
};