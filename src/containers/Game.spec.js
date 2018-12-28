import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import { mapStateToProps, Game } from './Game';
import BoardContainer from './Board';
import JoinContainer from './Join';
import { CONNECTION_ERROR } from '../constants/dictionary';

describe('Game Container', () => {
  const initialState = {};
  const initialProps = {};
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

  describe('Game', () => {
    describe('when a name prop is found', () => {
      it('renders the Board container', () => {
        const props = {
          name: 'Dave',
          connected: true
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
          connected: true
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
