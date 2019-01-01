import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { spy, stub } from 'sinon';
import { fromJS } from 'immutable';
import * as redux from 'redux';
import { mapStateToProps, mapDispatchToProps, Game } from './Game';
import { setGameId, joinGame } from '../actions/game';
import BoardContainer from './Board';
import JoinContainer from './Join';
import { CONNECTION_ERROR } from '../constants/dictionary';

describe('Game Container', () => {
  const initialState = {};
  const initialProps = {
    setGameId: () => {},
    joinGame: () => {},
    match: {
      params: {}
    }
  };
  const connect = (state, props) => shallow(
    <Game {...initialState} {...state} {...initialProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('returns the name', () => {
      const mockState = {
        user: {
          name: 'Dave'
        }
      };

      expect(mapStateToProps(fromJS(mockState))).to.have.property('name', 'Dave');
    });

    it('returns loading info', () => {
      const mockState = {
        game: {
          connected: true
        }
      };

      expect(mapStateToProps(fromJS(mockState))).to.have.property('connected', true);
    });
  });

  describe('mapDispatchToProps()', () => {
    it('returns the actions bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub).to.have.been.calledWith({
        setGameId,
        joinGame
      }, fakeDispatch);
    });
  });

  describe('Game', () => {
    describe('when mounting', () => {
      it('updates the GameID with the gameId url param', () => {
        const gameId = 'Game1234';
        const setGameIdSpy = spy();

        connect({}, {
          setGameId: setGameIdSpy,
          connected: false,
          match: {
            params: {
              gameId
            }
          }
        });

        expect(setGameIdSpy).to.have.been.calledOnceWith(gameId);
      });

      describe('if the user has already entered a name', () => {
        it('attempts to join the game', () => {
          const joinGameSpy = spy();

          connect({}, {
            joinGame: joinGameSpy,
            connected: false,
            name: 'Already Entered Name'
          });

          expect(joinGameSpy).to.have.been.calledOnce;
        });
      });
    });

    describe('when a name prop is found', () => {
      it('renders the Board container', () => {
        const props = {
          name: 'Dave',
          connected: true,
          ...initialProps
        };
        const wrapper = connect(undefined, props);

        expect(
          wrapper
            .find(BoardContainer)
            .props()
        ).to.deep.equal(props);
        expect(wrapper.contains(<JoinContainer />)).to.be.false;
      });

      describe('when the game is loading', () => {
        it('renders a loading alert', () => {
          const props = {
            name: 'Dave',
            connected: false
          };
          const wrapper = connect(undefined, props);

          expect(
            wrapper
              .find('.alert')
              .text()
          ).to.equal(CONNECTION_ERROR);
        });
      });

      describe('when the game has loaded OK', () => {
        it('doesnt render a loading alert', () => {
          const props = {
            name: 'Dave',
            connected: true
          };
          const wrapper = connect(undefined, props);

          expect(
            wrapper
              .find('.alert')
          ).to.have.lengthOf(0);
        });
      });
    });

    describe('when a gameId prop is not provided', () => {
      it('renders the Join container', () => {
        const props = {
          name: undefined,
          connected: true,
          ...initialProps
        };
        const wrapper = connect(undefined, props);

        expect(
          wrapper
            .find(JoinContainer)
            .props()
        ).to.deep.equal(props);
        expect(wrapper.contains(<BoardContainer />)).to.be.false;
      });
    });
  });
});
