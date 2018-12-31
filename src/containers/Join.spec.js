import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import React from 'react';
import * as redux from 'redux';
import { setName } from '../actions/user';
import { joinGame, setGameId } from '../actions/game';
import { Join, mapDispatchToProps } from './Join';

describe('Join Container', () => {
  const defaultProps = {
    joinGame: () => {},
    setGameId: () => {},
    setName: () => {},
    match: {
      params: {}
    }
  };
  const connect = (state, props) => shallow(
    <Join {...state} {...defaultProps} {...props} />
  );

  describe('mapDispatchToProps()', () => {
    it('returns the actions bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub).to.have.been.calledWith({
        joinGame,
        setGameId,
        setName
      }, fakeDispatch);
    });
  });

  describe('Join', () => {
    describe('when mounting', () => {
      it('updates the GameID with the gameId url param', () => {
        const gameId = 'Game1234';
        const setGameIdSpy = spy();
        connect({}, {
          setGameId: setGameIdSpy,
          match: {
            params: {
              gameId
            }
          }
        });

        expect(setGameIdSpy).to.have.been.calledOnceWith(gameId);
      });
    });

    describe('when the form is submitted', () => {
      it('updates the users name', () => {
        const name = 'Olga';
        const setNameSpy = spy();
        const wrapper = connect({}, {
          setName: setNameSpy
        });

        wrapper.find('input').simulate('change', { target: { value: 'testChange' } });
        wrapper.find('input').simulate('change', { target: { value: name } });

        wrapper.find('form').simulate('submit');

        expect(setNameSpy).to.have.been.calledOnceWith(name);
      });

      it('attempts to join the game', () => {
        const joinGameSpy = spy();
        const wrapper = connect({}, {
          joinGame: joinGameSpy
        });

        wrapper.find('form').simulate('submit');
        expect(joinGameSpy).to.have.been.calledOnce;
      });
    });
  });
});
