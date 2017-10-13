import { expect } from 'chai';
import { spy } from 'sinon';
import getState from './getState';

describe('Get State Middleware', () => {
  it('should call the next action', () => {
    const mockNext = spy();
    getState()(mockNext)();

    expect(mockNext.callCount).to.equal(1);
  });

  it('should provide current state to the thunk if a thunk if found', () => {
    const mockAction = spy();
    const mockStore = {
      getState: () => 'testState'
    };
    getState(mockStore)(() => {})(mockAction);

    expect(mockAction.calledWithExactly('testState')).to.be.ok;
  });

  it('should not try to invoke the action if it isnt a thunk', () => {
    const mockNext = spy();
    getState()(mockNext)('test');

    expect(mockNext.calledWith('test')).to.be.ok;
  });
});
