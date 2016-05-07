import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import React from 'react';
import _ from 'lodash';
import { NO_SCORES } from '../../../src/shared/constants/dictionary';
import Scoreboard from '../../../src/client/components/Scoreboard';
import Player from '../../../src/client/components/Player';

describe('Scoreboard Component', () => {
  it('renders a message when no score props have been passed', () => {
    const wrapper = shallow(<Scoreboard />);
    expect(wrapper.find('.scoreboard').text()).to.equal(NO_SCORES)
  });

  it('renders a message when an empty score prop is passed', () => {
    const wrapper = shallow(<Scoreboard scores={[]} />);
    expect(wrapper.find('.scoreboard').text()).to.equal(NO_SCORES)
  });

  it('renders a list of player components with the relevant props', () => {
    const testCases = 3;
    const scores = _.times(testCases, () => {
      return {
        name: faker.name.firstName(),
        vote: faker.random.number()
      }
    });
    const wrapper = shallow(<Scoreboard scores={scores} />);

    // Name Prop
    const playerNames = wrapper.find(Player).map(node => node.props().name);
    expect(playerNames).to.eql(_.map(scores, 'name'));

    // Vote Prop
    const playerVotes = wrapper.find(Player).map(node => node.props().vote);
    expect(playerVotes).to.eql(_.map(scores, 'vote'));
  });
});
