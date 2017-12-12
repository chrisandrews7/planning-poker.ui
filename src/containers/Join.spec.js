import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import faker from 'faker';
import React from 'react';
import * as redux from 'redux';
import { fromJS } from 'immutable';
import { setUser, setGame, join } from '../actions/user';
import { Join, mapStateToProps, mapDispatchToProps } from './Join';

describe('Join Container', () => {
  const defaultProps = {
    join: () => {},
    setGame: () => {},
    setUser: () => {},
    match: {
      params: {}
    }
  };
  const connect = (state, props) => shallow(
    <Join {...state} {...defaultProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('should map the name', () => {
      const mockState = {
        user: {
          name: faker.name.firstName()
        }
      };
      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        name: mockState.user.name
      });
    });
  });

  describe('mapDispatchToProps()', () => {
    it('should return the actions bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub.calledWith({
        setUser,
        setGame,
        join
      }, fakeDispatch)).to.be.ok;
    });
  });

  describe('Join', () => {
    it('should call setGame if the URL param is found', () => {
      const gameId = String(faker.random.number());
      const setGameSpy = spy();
      mount(
        <Join {...defaultProps} match={{ params: { gameId } }} setGame={setGameSpy} />
      );

      expect(setGameSpy.calledWithExactly(gameId)).to.be.true;
    });

    it('should not call setGame if the URL param is not provided', () => {
      const setGameSpy = spy();
      mount(
        <Join {...defaultProps} setGame={setGameSpy} />
      );

      expect(setGameSpy.called).to.be.false;
    });

    it('should call setUser when the username is changed', () => {
      const name = faker.name.firstName();
      const setUserSpy = spy();
      const wrapper = connect({}, {
        setUser: setUserSpy
      });

      wrapper.find('input').simulate('change', { target: { value: name } });
      expect(setUserSpy.calledWithExactly(name)).to.be.true;
    });

    it('should call join when the join button is clicked', () => {
      const joinSpy = spy();
      const wrapper = connect({}, {
        join: joinSpy
      });

      wrapper.find('button').simulate('click');
      expect(joinSpy.calledWith()).to.be.true;
    });
  });
});
