import { expect } from 'chai';
import config from 'config';
import ioclient from 'socket.io-client';
import app from '../../index';
import * as eventConstants from '../../../shared/constants/events';

describe('IO', () => {
  let io;
  let server;

  beforeEach((done) => {
    server = app.listen(config.get('port'), () => {
      io = ioclient.connect(`http://localhost:${config.get('port')}`);
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
    it('should emit ERROR if no gameId is specified', (done) => {
      io.emit(eventConstants.VOTE, {});
      io.on(eventConstants.ERROR, (data) => {
        expect(data).to.be.ok;
        done();
      });
    });

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
