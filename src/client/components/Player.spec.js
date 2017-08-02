import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import React from 'react';
import Player from './Player';

describe('Player Component', () => {
  it('renders the players name', () => {
    const name = faker.name.firstName();
    const wrapper = shallow(<Player name={name} />);
    expect(wrapper.find('.player__name').text()).to.equal(name);
  });

  it('renders the players vote', () => {
    const name = faker.name.firstName();
    const vote = faker.random.number();
    const wrapper = shallow(<Player name={name} vote={vote} />);
    expect(+wrapper.find('.player__vote').text()).to.equal(vote);
  });

  it('renders an empty string when no vote is passed through', () => {
    const name = faker.name.firstName();
    const wrapper = shallow(<Player name={name} />);
    expect(wrapper.find('.player__vote').text()).to.equal('');
  });
});
