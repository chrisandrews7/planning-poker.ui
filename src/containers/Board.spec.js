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
import { mapStateToProps, mapDispatchToProps, Board } from './Board';
import { setVote } from '../actions/user';
import * as playerSelectors from '../selectors/players';


describe('Board Container', () => {
  const initialState = {};
  const initialProps = {
    setVote: () => {},
    params: {}
  };
  const connect = (state, props) => shallow(
    <Board {...initialState} {...state} {...initialProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('should return the players and gameId', () => {
      stub(playerSelectors, 'selectAllPlayers').returns('players');
      const mockState = {
        players: {},
        user: {
          gameId: faker.random.number()
        }
      };

      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        players: 'players',
        gameId: mockState.user.gameId
      });
    });
  });

  describe('mapDispatchToProps()', () => {
    it('should return setVote bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub.calledWith({ setVote }, fakeDispatch)).to.be.true;
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
      expect(props.onVote).to.equal(wrapper.instance().props.setVote);
    });
  });
});
