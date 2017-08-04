import { expect } from 'chai';
import sinon from 'sinon';
import { browserHistory } from 'react-router';
import redirect from './redirect';

describe('Redirect Middleware', () => {
  let historyStub;

  beforeEach(() => {
    historyStub = sinon.stub(browserHistory, 'push');
  });

  afterEach(() => {
    historyStub.restore();
  });

  it('should call the next action', () => {
    const stubNext = sinon.spy();
    redirect()(stubNext)({});

    expect(stubNext.callCount).to.equal(1);
  });

  it('should not redirect if a redirect is not found in the action', () => {
    const stubNext = sinon.spy();
    redirect()(stubNext)({});

    expect(historyStub.called).to.be.false;
  });

  it('should redirect if a redirect is found in the action', () => {
    const stubNext = sinon.spy();
    const action = {
      redirect: '12345'
    };

    redirect()(stubNext)(action);

    expect(historyStub.calledWith(action.redirect)).to.be.ok;
  });
});
