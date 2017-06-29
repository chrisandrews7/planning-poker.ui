import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import PlayerList from '../../../src/client/components/PlayerList';
import VotePanel from '../../../src/client/components/VotePanel';
import VoteOptions from '../../../src/shared/constants/voting';
import { mapStateToProps, mapDispatchToProps, Board } from '../../../src/client/containers/Board';
import * as playerActions from '../../../src/client/actions/players';

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
        room: faker.lorem.word()
      }
    };

    expect(mapStateToProps(fromJS(testData))).to.deep.equal({
      players: {},
      user: testData.user.name,
      room: testData.user.room
    });
  });

  it('should bind the action creators to dispatch', () => {
    const spy = sinon.spy();
    mapDispatchToProps(spy).updateVote(1, 1);

    expect(spy.calledWith(playerActions.updateVote(1, 1))).to.be.ok;
  });

  it('should render the room', () => {
    const room = faker.lorem.word();
    const state = {
      room
    };
    const wrapper = connect(state);

    expect(
      wrapper
        .find('h1')
        .text()
    ).to.equal(`Room: ${room}`);
  });

  it('should render the PlayerList component with the list of players', () => {
    const expectedResults = {
      [faker.name.firstName()]: {
        name: faker.name.firstName(),
        vote: faker.random.number()
      }
    };
    const state = {
      players: expectedResults
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
    const wrapper = connect();

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
      { user },
      { updateVote: spy }
    );

    // Invoke the onVote function
    wrapper.find(VotePanel).props().onVote(1);

    expect(spy.calledWith(user, 1)).to.be.ok;
  });
});
