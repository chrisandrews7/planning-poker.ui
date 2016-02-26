import { expect } from 'chai';
import ioclient from 'socket.io-client';
import http from 'http';
import socketio from '../../io';
import { VOTE, VOTING_CHANGED } from '../../constants/events';

describe('IO', () => {
  let io;
  let server;

  beforeEach((done) => {
    server = http.Server();
    socketio.attach(server);
    server.listen(3333, () => {
      io = ioclient.connect('http://localhost:3333');
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
