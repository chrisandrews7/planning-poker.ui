import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, stub, match } from 'sinon';
import React from 'react';
import * as redux from 'redux';
import { joinGame, setUser } from '../actions/user';
import { Join, mapDispatchToProps } from './Join';

describe('Join Container', () => {
  const defaultProps = {
    joinGame: () => {},
    setUser: () => {},
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
        setUser
      }, fakeDispatch);
    });
  });

  describe('Join', () => {
    describe('when the join button is clicked', () => {
      it('invokes setUser with the users name', () => {
        const name = 'Olga';
        const setUserSpy = spy();
        const wrapper = connect({}, {
          setUser: setUserSpy
        });

        wrapper.find('input').simulate('change', { target: { value: name } });

        wrapper.find('button').simulate('click');
        expect(setUserSpy).to.have.been.calledWith(match({
          name
        }));
      });

      it('invokes setUser with the gameId url param', () => {
        const gameId = 'Game1234';
        const setUserSpy = spy();
        const wrapper = connect({}, {
          setUser: setUserSpy,
          match: {
            params: {
              gameId
            }
          }
        });

        wrapper.find('button').simulate('click');
        expect(setUserSpy).to.have.been.calledWith(match({
          gameId
        }));
      });

      it('invokes joinGame', () => {
        const joinGameSpy = spy();
        const wrapper = connect({}, {
          joinGame: joinGameSpy
        });

        wrapper.find('button').simulate('click');
        expect(joinGameSpy).to.have.been.calledOnce;
      });
    });
  });
});
