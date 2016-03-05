import { expect } from 'chai';
import sinon from 'sinon';
import * as eventConstants from '../../../../shared/constants/events';
import * as player from '../../../handlers/player';

describe('Player Handler', () => {
    describe('Vote', () => {
        it('should emit VOTING_CHANGED when called', () => {
            const gameId = 'test';
            const io = {
                emit: sinon.stub().returnsThis(),
                to: sinon.stub().returnsThis()
            };

            player.vote.call(io, {}, gameId);
            expect(io.to.calledWith(gameId)).to.be.ok;
            expect(io.emit.calledWith(eventConstants.VOTING_CHANGED)).to.be.ok;
        });
    });
});
