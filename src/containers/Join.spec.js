import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import React from 'react';
import * as redux from 'redux';
import { setName, observe } from '../actions/user';
import { joinGame } from '../actions/game';
import { Join, mapDispatchToProps } from './Join';

describe('Join Container', () => {
  const defaultProps = {
    joinGame: () => {},
    setName: () => {},
    observe: () => {},
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
        setName,
        observe
      }, fakeDispatch);
    });
  });

  describe('Join', () => {
    describe('when the form is submitted', () => {
      it('prevents the forms default behavior', () => {
        const preventDefault = spy();
        const wrapper = connect();

        wrapper.find('form').simulate('submit', { preventDefault });

        expect(preventDefault).to.have.been.calledOnce;
      });

      it('updates the users name', () => {
        const name = 'Olga';
        const setNameSpy = spy();
        const wrapper = connect({}, {
          setName: setNameSpy
        });

        wrapper.find('input[id="name"]').simulate('change', {
          target: {
            id: 'name',
            value: 'testChange'
          }
        });
        wrapper.find('input[id="name"]').simulate('change', {
          target: {
            id: 'name',
            value: name
          }
        });

        wrapper.find('form').simulate('submit', { preventDefault: () => {} });

        expect(setNameSpy).to.have.been.calledOnceWith(name);
      });

      it('doesnt set the user as an observer', () => {
        const observeSpy = spy();
        const wrapper = connect({}, {
          observe: observeSpy
        });

        wrapper.find('form').simulate('submit', { preventDefault: () => {} });

        expect(observeSpy).to.not.have.been.called;
      });

      describe('when the observer checkbox is true', () => {
        it('sets the user to being an observer', () => {
          const observeSpy = spy();
          const wrapper = connect({}, {
            observe: observeSpy
          });

          wrapper.find('input[id="isObserver"]').simulate('change', {
            target: {
              id: 'isObserver',
              type: 'checkbox',
              checked: true
            }
          });
          wrapper.find('form').simulate('submit', { preventDefault: () => {} });

          expect(observeSpy).to.have.been.calledOnce;
        });
      });

      it('attempts to join the game', () => {
        const joinGameSpy = spy();
        const wrapper = connect({}, {
          joinGame: joinGameSpy
        });

        wrapper.find('form').simulate('submit', { preventDefault: () => {} });
        expect(joinGameSpy).to.have.been.calledOnce;
      });
    });
  });
});
