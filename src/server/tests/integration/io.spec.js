import { expect } from 'chai';
import config from 'config';
import ioclient from 'socket.io-client';
import app from '../../index';
import * as eventConstants from '../../../shared/constants/events';

xdescribe('IO', () => {
    let io;
    let server;

    beforeEach((done) => {
        server = app.listen(config.get('port'), () => {
            io = ioclient.connect(`http://localhost:${config.get('port')}`, {
                'reconnection delay': 0,
                'reopen delay': 0,
                'force new connection': true
            });
            io.on('connect', () => {
                done();
            });
        });
    });

    afterEach((done) => {
        io.disconnect();
        server.close(done);
    });

    describe('Vote', () => {
        it('should emit VOTING_CHANGED when VOTE is emitted', (done) => {
            const gameId = 'test';
            io.emit(eventConstants.JOIN, gameId);
            io.emit(eventConstants.VOTE, {}, gameId);
            io.on(eventConstants.VOTING_CHANGED, (data) => {
                expect(data).to.be.ok;
                done();
            });
        });
    });
});
