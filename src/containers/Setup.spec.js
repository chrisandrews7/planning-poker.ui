import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';
import faker from 'faker';
import React from 'react';
import * as redux from 'redux';
import { fromJS } from 'immutable';
import { startNewGame, setGame, setUser } from '../actions/user';
import { Setup, mapStateToProps, mapDispatchToProps } from './Setup';

describe('Setup Container', () => {
  const connect = (state, props) => mount(
    <Setup {...state} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('should map the name, gameId', () => {
      const mockState = {
        user: {
          name: faker.name.firstName(),
          gameId: faker.random.number()
        }
      };
      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        name: mockState.user.name,
        gameId: mockState.user.gameId
      });
    });
  });

  describe('mapDispatchToProps()', () => {
    it('should return startNewGame, setUser bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub.calledWith({
        startNewGame,
        setUser,
        setGame
      }, fakeDispatch)).to.be.ok;
    });
  });

  describe('Setup', () => {
    it('should render a Start New Game button', () => {
      const startGameSpy = spy();
      const wrapper = connect({}, {
        startNewGame: startGameSpy,
        setUser: () => {},
        setGame: () => {}
      });

      wrapper.find('button').simulate('click');
      expect(startGameSpy.called).to.be.ok;
    });

    it('should call setUser when the username is changed', () => {
      const name = faker.name.firstName();
      const setUserSpy = spy();
      const wrapper = connect({}, {
        startNewGame: () => {},
        setGame: () => {},
        setUser: setUserSpy
      });

      wrapper.find('input[name="user"]').simulate('change', { target: { value: name } });
      expect(setUserSpy.calledWithExactly(name)).to.be.ok;
    });

    it('should call setGame when the gameId is changed', () => {
      const gameId = faker.random.number();
      const setGameSpy = spy();
      const wrapper = connect({}, {
        startNewGame: () => {},
        setGame: setGameSpy,
        setUser: () => {}
      });

      wrapper.find('input[name="gameId"]').simulate('change', { target: { value: gameId } });
      expect(setGameSpy.calledWithExactly(gameId)).to.be.ok;
    });
  });
});
