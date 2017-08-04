import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import * as redux from 'redux';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import VoteOptions from '../constants/voting';
import { mapStateToProps, mapDispatchToProps, Board } from './Board';
import { updateVote } from '../actions/players';
import { setGame } from '../actions/user';

describe('Board Container', () => {
  const initialState = {};
  const initialProps = {
    updateVote: () => {},
    setGame: () => {},
    params: {}
  };
  const connect = (state, props) => shallow(
    <Board {...initialState} {...state} {...initialProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('should return the players, user and gameId', () => {
      const testData = {
        players: {},
        user: {
          name: faker.name.firstName(),
          gameId: faker.random.number()
        }
      };

      expect(mapStateToProps(fromJS(testData))).to.deep.equal({
        players: {},
        user: testData.user.name,
        gameId: testData.user.gameId
      });
    });
  });

  describe('mapDispatchToProps()', () => {
    it('should return updateVote and setGame bound to the dispatch', () => {
      const bindACStub = sinon.stub(redux, 'bindActionCreators');
      const fakeDispatch = sinon.spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub.calledWith({ updateVote, setGame }, fakeDispatch)).to.be.ok;
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
      it('should call props.updateVote with the user and vote', () => {
        const updateVoteSpy = sinon.spy();
        const user = faker.name.firstName();
        const args = {
          test: 1
        };
        const wrapper = connect(
          { user },
          { updateVote: updateVoteSpy }
        );

        // Invoke the function
        wrapper.instance().onVote(args);
        expect(updateVoteSpy.calledWith(user, ...args)).to.be.ok;
      });
    });
  });
});
