import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, stub, match } from 'sinon';
import faker from 'faker';
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
    it('should return the actions bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub.calledWith({
        joinGame
      }, fakeDispatch)).to.be.ok;
    });
  });

  describe('Join', () => {
    describe('when the join button is clicked', () => {
      it('should call joinGame with the users name', () => {
        const name = faker.name.firstName();
        const joinGameSpy = spy();
        const wrapper = connect({}, {
          joinGame: joinGameSpy
        });

        wrapper.find('input').simulate('change', { target: { value: name } });

        wrapper.find('button').simulate('click');
        expect(joinGameSpy.calledWith(match({
          name
        }))).to.be.true;
      });

      it('should call joinGame with the gameId url param', () => {
        const gameId = faker.random.uuid();
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
        expect(joinGameSpy.calledWith(match({
          gameId
        }))).to.be.true;
      });
    });
  });
});
