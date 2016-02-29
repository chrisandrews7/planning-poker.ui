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

  describe('Player', () => {
    it('should emit an error if no gameId is specified', (done) => {
      io.emit(eventConstants.VOTE, {});
      io.on(eventConstants.ERROR, (data) => {
        expect(data).to.be.ok;
        done();
      });
    });

    it('should receive a voting changed event when a vote event is emitted', (done) => {
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
