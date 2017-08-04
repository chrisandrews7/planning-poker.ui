import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { browserHistory } from 'react-router';
import redirect from './redirect';

describe('Redirect Middleware', () => {
  let historyStub;

  beforeEach(() => {
    historyStub = stub(browserHistory, 'push');
  });

  afterEach(() => {
    historyStub.restore();
  });

  it('should call the next action', () => {
    const stubNext = spy();
    redirect()(stubNext)({});

    expect(stubNext.callCount).to.equal(1);
  });

  it('should not redirect if a redirect is not found in the action', () => {
    redirect()(() => {})({});

    expect(historyStub.called).to.be.false;
  });

  it('should redirect if a redirect is found in the action', () => {
    const action = {
      redirect: '12345'
    };

    redirect()(() => {})(action);

    expect(historyStub.calledWith(action.redirect)).to.be.ok;
  });
});
