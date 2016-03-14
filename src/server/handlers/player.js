import { VOTE_UPDATED, ERROR } from '../../shared/constants/events';
import voteModel from '../models/vote';

async function vote(vote, playerId, gameId) {
    try {
        await voteModel.setVote(gameId, playerId, vote);
        this.broadcast.to(gameId).emit(VOTE_UPDATED, {playerId: playerId, vote: vote});
    } catch (exception) {
        this.emit(ERROR, exception);
    }
}

export default {
    vote
};
