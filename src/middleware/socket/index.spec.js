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

  it('should start listening to events', () => {
    const mockSocket = spy();
    socket(mockSocket)(mockStore)(() => {})();

    expect(stubListeners.calledWithExactly(mockSocket, mockStore.dispatch)).to.be.ok;
  });

  it('should call the next action', () => {
    const mockNext = spy();
    socket()(mockStore)(mockNext)({});

    expect(mockNext.callCount).to.equal(1);
  });

  it('should not emit anything if a value is not found in the action', () => {
    const mockSocket = {
      emit: spy()
    };
    socket(mockSocket)(mockStore)(() => {})({});
    socket(mockSocket)(mockStore)(() => {})({ meta: {} });

    expect(mockSocket.emit.called).to.be.false;
  });

  it('should emit an event with the params', () => {
    const mockSocket = {
      emit: spy()
    };
    socket(mockSocket)(mockStore)(() => {})({
      meta: {
        emit: {
          type: 'testEvent',
          params: {
            test: 1
          }
        }
      }
    });

    expect(mockSocket.emit.calledWithExactly(
      'testEvent',
      { test: 1 }
    )).to.be.ok;
  });
});
