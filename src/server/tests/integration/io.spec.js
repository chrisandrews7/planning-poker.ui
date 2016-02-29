import { expect } from 'chai';
import config from 'config';
import ioclient from 'socket.io-client';
import app from '../../index';
import { VOTE, VOTING_CHANGED } from '../../../shared/constants/events';

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

  it('should receive a voting changed event when a vote event is emitted', (done) => {
    io.emit(VOTE, {});
    io.on(VOTING_CHANGED, (data) => {
      expect(data).to.be.ok;
      done();
    });
  });
});
