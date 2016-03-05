import { expect } from 'chai';
import sinon from 'sinon';
import * as common from '../../../handlers/common';

describe('Common Handler', () => {
    describe('Join', () => {
        it('should join the specified gameId', () => {
            const gameId = 'test';
            const socket = {
                join: sinon.spy()
            };

            common.join.call(socket, gameId);
            expect(socket.join.calledWith(gameId)).to.be.ok;
        });
    });
});
