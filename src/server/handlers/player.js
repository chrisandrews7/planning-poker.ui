import { VOTES_UPDATED, ERROR } from '../../shared/constants/events';
import voteModel from '../models/vote';

async function vote(data, gameId) {
    try {
        await voteModel.setVote(gameId, data.user, data.vote);
        const result = await voteModel.getVotes(gameId);
        this.broadcast.to(gameId).emit(VOTES_UPDATED, result);
    } catch (exception) {
        this.emit(ERROR, exception);
    }
}

export default {
    vote
};