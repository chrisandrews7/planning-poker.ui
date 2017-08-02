import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import userActions from '../actions/user';
import { Setup, mapStateToProps, mapDispatchToProps } from './Setup';

describe('Setup Container', () => {
  const connect = (state, props) => shallow(
    <Setup {...state} {...props} />
  );

  it('should map the correct state to props', () => {
    expect(mapStateToProps()).to.deep.equal({});
  });

  it('should bind the action creators to dispatch', () => {
    const spy = sinon.spy();
    mapDispatchToProps(spy).startNewGame();

    expect(spy.calledWith(userActions.startNewGame())).to.be.ok;
  });

  it('should render a Start New Game button', () => {
    const spy = sinon.spy();
    const wrapper = connect({}, {
      startNewGame: spy
    });

    wrapper.find('button').simulate('click');
    expect(spy.called).to.be.ok;
  });
});
