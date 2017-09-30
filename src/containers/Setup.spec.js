import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';
import faker from 'faker';
import React from 'react';
import * as redux from 'redux';
import { fromJS } from 'immutable';
import { setUser } from '../actions/user';
import { setRandomGame, setGame, join } from '../actions/game';
import { Setup, mapStateToProps, mapDispatchToProps } from './Setup';

describe('Setup Container', () => {
  const connect = (state, props) => mount(
    <Setup {...state} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('should map the name, gameId', () => {
      const mockState = {
        game: {
          id: faker.random.number()
        },
        user: {
          name: faker.name.firstName()
        }
      };
      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        name: mockState.user.name,
        gameId: mockState.game.id
      });
    });
  });

  describe('mapDispatchToProps()', () => {
    it('should return setRandomGame, setUser bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub.calledWith({
        setRandomGame,
        setUser,
        setGame,
        join
      }, fakeDispatch)).to.be.ok;
    });
  });

  describe('Setup', () => {
    it('should render a Start New Game button', () => {
      const setRandomGameSpy = spy();
      const wrapper = connect({}, {
        setRandomGame: setRandomGameSpy,
        join: () => {},
        setUser: () => {},
        setGame: () => {}
      });

      wrapper.find('.setup__random-game').simulate('click');
      expect(setRandomGameSpy.called).to.be.ok;
    });

    it('should call setUser when the username is changed', () => {
      const name = faker.name.firstName();
      const setUserSpy = spy();
      const wrapper = connect({}, {
        setRandomGame: () => {},
        join: () => {},
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
        setRandomGame: () => {},
        join: () => {},
        setGame: setGameSpy,
        setUser: () => {}
      });

      wrapper.find('input[name="gameId"]').simulate('change', { target: { value: gameId } });
      expect(setGameSpy.calledWithExactly(gameId)).to.be.ok;
    });

    it('should call join when the join button is clicked', () => {
      const gameId = faker.random.number();
      const name = faker.name.firstName();

      const joinSpy = spy();
      const wrapper = connect({}, {
        setRandomGame: () => {},
        join: joinSpy,
        setUser: () => {},
        setGame: () => {},
        gameId,
        name
      });

      wrapper.find('.setup__join').simulate('click');
      expect(joinSpy.calledWith(gameId, name)).to.be.ok;
    });
  });
});
