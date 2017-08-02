import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import * as redux from 'redux';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import VoteOptions from '../../shared/constants/voting';
import { mapStateToProps, mapDispatchToProps, Board } from './Board';
import playerActions from '../actions/players';
import userActions from '../actions/user';

describe('Board Container', () => {
  const initialState = {
    players: {}
  };
  const initialProps = {
    updateVote: () => {}
  };
  const connect = (state, props) => shallow(
    <Board {...initialState} {...state} {...initialProps} {...props} />
  );

  it('should map the correct state to props', () => {
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

  it('should bind the action creators to dispatch', () => {
    const spy = sinon.spy();
    const result = mapDispatchToProps(spy);
    result.updateVote(1, 1);
    result.setGame(1);

    expect(spy.calledWith(playerActions.updateVote(1, 1))).to.be.ok;
    expect(spy.calledWith(userActions.setGame(1))).to.be.ok;
  });

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

  it('should render the VotePanel component with the options', () => {
    const wrapper = connect({
      gameId: faker.random.number()
    });

    expect(
      wrapper
        .find(VotePanel)
        .props()
        .options
    ).to.deep.equal(VoteOptions);
  });

  it('should pass the updateVote action with the user to the VotePanel component', () => {
    const spy = sinon.spy();
    const user = faker.name.firstName();
    const wrapper = connect(
      {
        user,
        gameId: faker.random.number()
      },
      { updateVote: spy }
    );

    // Invoke the onVote function
    wrapper.find(VotePanel).props().onVote(1);

    expect(spy.calledWith(user, 1)).to.be.ok;
  });
});
