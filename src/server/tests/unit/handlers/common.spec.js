import { expect } from 'chai';
import sinon from 'sinon';

import { PLAYER_JOINED } from '../../../../shared/constants/events';
import common from '../../../handlers/common';
import playerModel from '../../../models/player';

describe('Common Handler', () => {
    describe('Join', () => {
        let socketMock;
        let addPlayerMock;

        before(() => {
            addPlayerMock = sinon.stub(playerModel, 'addPlayer').returns(true);
        })

        beforeEach(() => {
            socketMock = {
                broadcast: {
                    emit: sinon.stub().returnsThis(),
                    to: sinon.stub().returnsThis()
                },
                join: sinon.spy()
            };
        });

        it('should join the specified gameId', async () => {
            const gameId = 'test';
            const playerId = 'testPlayer';

            await common.join.call(socketMock, gameId, playerId);
            expect(socketMock.join.calledWith(gameId)).to.be.ok;
        });

        it('should broadcast PLAYER_JOINED to the room with the playerId when called', async () => {
            const gameId = 'testGame';
            const playerId = 'testPerson';

            await common.join.call(socketMock, gameId, playerId);

            expect(socketMock.broadcast.to.calledWith(gameId)).to.be.ok;
            expect(socketMock.broadcast.emit.calledWithExactly(PLAYER_JOINED, {
                playerId: playerId
            })).to.be.ok;
        });

        it('should call the addPlayer function in the player model', async () => {
            const gameId = 'testGame1';
            const playerId = 'testPerson1';

            await common.join.call(socketMock, gameId, playerId);

            expect(addPlayerMock.calledWithExactly(gameId, playerId)).to.be.ok;
        });
    });
});
