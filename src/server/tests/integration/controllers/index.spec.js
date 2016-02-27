import request from 'supertest';
import httpStatus from 'http-status';
import config from 'config';
import app from '../../../index';

describe('Index Controller', () => {
  let server;

  beforeEach(() => {
    server = app.listen(config.get('port'));
  });

  afterEach((done) => {
    server.close(done);
  });

  it('responds to / and returns a html page', (done) => {
    request(server)
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(httpStatus.OK, done);
  });
});
