import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import userActions from '../../../src/client/actions/user';
import { Setup, mapStateToProps, mapDispatchToProps } from '../../../src/client/containers/Setup';

describe('Setup Container', () => {
  const connect = (state, props) => shallow(
    <Setup {...state} {...props} />
  );

  it('should map the correct state to props', () => {
    expect(mapStateToProps()).to.deep.equal({});
  });

  it('should bind the action creators to dispatch', () => {
    const spy = sinon.spy();
    mapDispatchToProps(spy).startNewRoom();

    expect(spy.calledWith(userActions.startNewRoom())).to.be.ok;
  });

  it('should render a Start New Room button', () => {
    const spy = sinon.spy();
    const wrapper = connect({}, {
      startNewRoom: spy
    });

    wrapper.find('button').simulate('click');
    expect(spy.called).to.be.ok;
  });
});
