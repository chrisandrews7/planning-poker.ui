import { expect } from 'chai';
import { spy, stub } from 'sinon';
import * as listeners from './listeners';
import socket from './';

describe('Socket Middleware', () => {
  let stubListeners;
  const mockStore = {
    dispatch: spy()
  };

  beforeAll(() => {
    stubListeners = stub(listeners, 'default');
  });

  afterAll(() => {
    stubListeners.restore();
  });

  it('starts listening to events', () => {
    const mockSocket = spy();
    socket(mockSocket)(mockStore)(() => {})();

    expect(stubListeners.calledWithExactly(mockSocket, mockStore.dispatch)).to.be.ok;
  });

  it('invokes the next action', () => {
    const mockNext = spy();
    socket()(mockStore)(mockNext)('action');

    expect(mockNext.calledWith('action')).to.be.ok;
  });
});
