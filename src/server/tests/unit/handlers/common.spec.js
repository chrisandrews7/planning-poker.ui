import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import { PLAYER_JOINED, PLAYER_LEFT, ERROR } from '../../../../shared/constants/events';
import common from '../../../handlers/common';
import playerModel from '../../../models/player';

describe('Common Handler', () => {
    let sandbox;
    let params;
    let socketMock;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        socketMock = {
            broadcast: {
                emit: sandbox.stub().returnsThis(),
                to: sandbox.stub().returnsThis()
            },
            join: sandbox.spy(),
            leave: sandbox.spy(),
            emit: sandbox.spy()
        };
        params = {
            gameId: faker.random.number(),
            playerId: faker.name.firstName()
        }
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Join', () => {
        it('should join the specified gameId', async () => {
            sandbox.stub(playerModel, 'addPlayer').returns(Promise.resolve());

            await common.join.call(socketMock, params.gameId, params.playerId);
            expect(socketMock.join.calledWith(params.gameId)).to.be.ok;
        });

        it('should broadcast PLAYER_JOINED to the room with the playerId when called', async () => {
            sandbox.stub(playerModel, 'addPlayer').returns(Promise.resolve());

            await common.join.call(socketMock, params.gameId, params.playerId);

            expect(socketMock.broadcast.to.calledWith(params.gameId)).to.be.ok;
            expect(socketMock.broadcast.emit.calledWithExactly(PLAYER_JOINED, {
                playerId: params.playerId
            })).to.be.ok;
        });

        it('should call the addPlayer function on the player model', async () => {
            const playerMock = sandbox.stub(playerModel, 'addPlayer').returns(Promise.resolve());

            await common.join.call(socketMock, params.gameId, params.playerId);

            expect(playerMock.calledWithExactly(params.gameId, params.playerId)).to.be.ok;
        });

        it('should emit ERROR when a problem occurs', async () => {
            sandbox.stub(playerModel, 'addPlayer').returns(Promise.reject());

            await common.join.call(socketMock, params.gameId, params.playerId);

            expect(socketMock.emit.calledWith(ERROR)).to.be.ok;
        });
    });

    describe('Leave', () => {
        it('should leave the specified gameId', async () => {
            sandbox.stub(playerModel, 'removePlayer').returns(Promise.resolve());

            await common.leave.call(socketMock, params.gameId, params.playerId);
            expect(socketMock.leave.calledWith(params.gameId)).to.be.ok;
        });

        it('should broadcast PLAYER_LEFT to the room with the playerId when called', async () => {
            sandbox.stub(playerModel, 'removePlayer').returns(Promise.resolve());

            await common.leave.call(socketMock, params.gameId, params.playerId);

            expect(socketMock.broadcast.to.calledWith(params.gameId)).to.be.ok;
            expect(socketMock.broadcast.emit.calledWithExactly(PLAYER_LEFT, {
                playerId: params.playerId
            })).to.be.ok;
        });

        it('should call the removePlayer function on the player model', async () => {
            const playerMock = sandbox.stub(playerModel, 'removePlayer').returns(Promise.resolve());

            await common.leave.call(socketMock, params.gameId, params.playerId);

            expect(playerMock.calledWithExactly(params.gameId, params.playerId)).to.be.ok;
        });

        it('should emit ERROR when a problem occurs', async () => {
            sandbox.stub(playerModel, 'removePlayer').returns(Promise.reject());

            await common.leave.call(socketMock, params.gameId, params.playerId);

            expect(socketMock.emit.calledWith(ERROR)).to.be.ok;
        });
    });
});
