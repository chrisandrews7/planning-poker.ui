import request from 'supertest';
import httpStatus from 'http-status';

import app from '../../index';

describe('Server', () => {
  let server;

  beforeEach(() => {
    server = app.listen(3333);
  });

  afterEach((done) => {
    server.close(done);
  });

  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(httpStatus.OK, done);
  });

  it('returns a 404 for anything else', (done) => {
    request(server)
      .get('/page-doesnt-exist')
      .expect(httpStatus.NOT_FOUND, done);
  });
});
