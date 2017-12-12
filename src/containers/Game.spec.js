import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import { mapStateToProps, Game } from './Game';
import BoardContainer from '../containers/Board';
import JoinContainer from '../containers/Join';

describe('Game Container', () => {
  const initialState = {};
  const initialProps = {};
  const connect = (state, props) => shallow(
    <Game {...initialState} {...state} {...initialProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('should return the loading status', () => {
      const mockState = {
        user: {
          loading: true
        }
      };

      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        loading: true
      });
    });
  });

  describe('Game', () => {
    it('should render the Board if its loading', () => {
      const props = {
        loading: true
      };
      const wrapper = connect(undefined, props);

      expect(
        wrapper
          .find(BoardContainer)
          .props()
      ).to.equal(wrapper.props());
      expect(wrapper.contains(<JoinContainer />)).to.be.false;
    });

    it('should render the Join if its not loading', () => {
      const props = {
        loading: false
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
