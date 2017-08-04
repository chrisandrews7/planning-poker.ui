import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import * as redux from 'redux';
import { startNewGame } from '../actions/user';
import { Setup, mapStateToProps, mapDispatchToProps } from './Setup';

describe('Setup Container', () => {
  const connect = (state, props) => shallow(
    <Setup {...state} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('should map nothing', () => {
      expect(mapStateToProps()).to.deep.equal({});
    });
  });

  describe('mapDispatchToProps()', () => {
    it('should return startNewGame bound to the dispatch', () => {
      const bindACStub = sinon.stub(redux, 'bindActionCreators');
      const fakeDispatch = sinon.spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub.calledWith({ startNewGame }, fakeDispatch)).to.be.ok;
    });
  });

  describe('Setup', () => {
    it('should render a Start New Game button', () => {
      const spy = sinon.spy();
      const wrapper = connect({}, {
        startNewGame: spy
      });

      wrapper.find('button').simulate('click');
      expect(spy.called).to.be.ok;
    });
  });
});
