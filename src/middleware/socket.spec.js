import { expect } from 'chai';
import { spy } from 'sinon';
import socket from './socket';

describe('Socket Middleware', () => {
  it('should call the next action', () => {
    const stubNext = spy();
    socket()()(stubNext)({});

    expect(stubNext.callCount).to.equal(1);
  });

  it('should not emit anything if a value is not found in the action', () => {
    const stubSocket = {
      emit: spy()
    };
    socket(stubSocket)()(() => {})({});
    socket(stubSocket)()(() => {})({ meta: {} });

    expect(stubSocket.emit.called).to.be.false;
  });

  it('should emit an event with the params', () => {
    const stubSocket = {
      emit: spy()
    };
    socket(stubSocket)()(() => {})({
      meta: {
        emit: {
          type: 'testEvent',
          params: {
            test: 1
          }
        }
      }
    });

    expect(stubSocket.emit.calledWithExactly(
      'testEvent',
      { test: 1 }
    )).to.be.ok;
  });
});
