import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import { mapStateToProps, Game } from './Game';
import BoardContainer from './Board/index';
import JoinContainer from './Join';

describe('Game Container', () => {
  const initialState = {};
  const initialProps = {};
  const connect = (state, props) => shallow(
    <Game {...initialState} {...state} {...initialProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('returns the gameId', () => {
      const mockState = {
        user: {
          gameId: 'game12345'
        }
      };

      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        gameId: 'game12345'
      });
    });
  });

  describe('Game', () => {
    describe('when a gameId prop is provided', () => {
      it('renders the Board container', () => {
        const props = {
          gameId: 'game12345'
        };
        const wrapper = connect(undefined, props);

        expect(
          wrapper
            .find(BoardContainer)
            .props()
        ).to.equal(wrapper.props());
        expect(wrapper.contains(<JoinContainer />)).to.be.false;
      });
    });

    describe('when a gameId prop is not provided', () => {
      it('renders the Join container', () => {
        const props = {
          gameId: undefined
        };
        const wrapper = connect(undefined, props);

        expect(
          wrapper
            .find(JoinContainer)
            .props()
        ).to.equal(wrapper.props());
        expect(wrapper.contains(<BoardContainer />)).to.be.false;
      });
    });
  });
});
