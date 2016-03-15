import { expect } from 'chai';
import sinon from 'sinon';

import * as eventConstants from '../../../../shared/constants/events';
import * as player from '../../../handlers/player';
import voteModel from '../../../models/vote';

describe('Player Handler', () => {
    describe('Vote', () => {
        let socketMock;
        const voteMock = sinon.stub(voteModel, 'setVote').returns(true);

        beforeEach(() => {
            socketMock = {
                broadcast: {
                    emit: sinon.stub().returnsThis(),
                    to: sinon.stub().returnsThis()
                }
            };
        });

        it('should broadcast VOTE_UPDATED to the room with vote and playerId when called', async () => {
            const gameId = 'testGame';
            const playerId = 'testPerson';
            const vote = 111;

            await player.vote.call(socketMock, vote, playerId, gameId);

            expect(socketMock.broadcast.to.calledWith(gameId)).to.be.ok;
            expect(socketMock.broadcast.emit.calledWithExactly(eventConstants.VOTE_UPDATED, {
                playerId: playerId,
                vote: vote
            })).to.be.ok;
        });

        it('should call the setVote function in the vote model', async () => {
            const gameId = 'testGame1';
            const playerId = 'testPerson1';
            const vote = 5555;

            await player.vote.call(socketMock, vote, playerId, gameId);

            expect(voteMock.calledWithExactly(gameId, playerId, vote)).to.be.ok;
        });
    });
});
