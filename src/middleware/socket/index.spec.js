import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as subscribe from './subscribe';
import socket from './';

describe('Socket Middleware', () => {
  let stubSubscribe;
  const mockStore = {
    dispatch: spy()
  };

  beforeAll(() => {
    stubSubscribe = stub(subscribe, 'default');
  });

  afterAll(() => {
    stubSubscribe.restore();
  });

  it('starts listening to events', () => {
    const mockSocket = spy();
    socket(mockSocket)(mockStore)(() => {})();

    expect(stubSubscribe).to.have.been.calledWithExactly(mockSocket, mockStore.dispatch);
  });

  it('invokes the next action', () => {
    const mockNext = spy();
    socket()(mockStore)(mockNext)('action');

    expect(mockNext).to.have.been.calledWith('action');
  });
});
