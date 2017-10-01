import { expect } from 'chai';
import faker from 'faker';
import { spy, stub } from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import * as redux from 'redux';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import VoteOptions from '../constants/voting';
import { mapStateToProps, mapDispatchToProps, Game } from './Game';
import { setVote } from '../actions/user';

describe('Game Container', () => {
  const initialState = {};
  const initialProps = {
    setVote: () => {},
    params: {}
  };
  const connect = (state, props) => shallow(
    <Game {...initialState} {...state} {...initialProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('should return the players and gameId', () => {
      const mockState = {
        players: {},
        game: {
          id: faker.random.number()
        }
      };

      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        players: {},
        gameId: mockState.game.id
      });
    });
  });

  describe('mapDispatchToProps()', () => {
    it('should return setVote bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub.calledWith({ setVote }, fakeDispatch)).to.be.ok;
    });
  });

  describe('Board', () => {
    it('should render the game ID', () => {
      const gameId = faker.random.number();
      const state = {
        gameId
      };
      const wrapper = connect(state);

      expect(
        wrapper
          .find('h1')
          .text()
      ).to.equal(`Game: ${gameId}`);
    });

    it('should render the PlayerList component with the list of players', () => {
      const expectedResults = {
        [faker.name.firstName()]: {
          name: faker.name.firstName(),
          vote: faker.random.number()
        }
      };
      const state = {
        players: expectedResults,
        gameId: faker.random.number()
      };
      const wrapper = connect(state);

      expect(
        wrapper
          .find(PlayerList)
          .props()
          .players
      ).to.deep.equal(expectedResults);
    });

    it('should render the VotePanel component with the options and the onVote method', () => {
      const wrapper = connect({
        gameId: faker.random.number()
      });

      const props = wrapper
        .find(VotePanel)
        .props();

      expect(props.options).to.deep.equal(VoteOptions);
      expect(props.onVote).to.equal(wrapper.instance().onVote);
    });

    describe('onVote()', () => {
      it('should call props.setVote with the user and vote', () => {
        const setVoteSpy = spy();
        const vote = 5;
        const wrapper = connect(
          undefined,
          { setVote: setVoteSpy }
        );

        // Invoke the function
        wrapper.instance().onVote(vote);
        expect(setVoteSpy.calledWithExactly(5)).to.be.ok;
      });
    });
  });
});
