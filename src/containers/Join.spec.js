import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, stub, match } from 'sinon';
import React from 'react';
import * as redux from 'redux';
import { joinGame } from '../actions/user';
import { Join, mapDispatchToProps } from './Join';

describe('Join Container', () => {
  const defaultProps = {
    joinGame: () => {},
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
        joinGame
      }, fakeDispatch);
    });
  });

  describe('Join', () => {
    describe('when the join button is clicked', () => {
      it('invokes joinGame with the users name', () => {
        const name = 'Olga';
        const joinGameSpy = spy();
        const wrapper = connect({}, {
          joinGame: joinGameSpy
        });

        wrapper.find('input').simulate('change', { target: { value: name } });

        wrapper.find('button').simulate('click');
        expect(joinGameSpy).to.have.been.calledWith(match({
          name
        }));
      });

      it('invokes joinGame with the gameId url param', () => {
        const gameId = 'Game1234';
        const joinGameSpy = spy();
        const wrapper = connect({}, {
          joinGame: joinGameSpy,
          match: {
            params: {
              gameId
            }
          }
        });

        wrapper.find('button').simulate('click');
        expect(joinGameSpy).to.have.been.calledWith(match({
          gameId
        }));
      });
    });
  });
});
