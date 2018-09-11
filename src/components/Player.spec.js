import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Player from './Player';

describe('Player Component', () => {
  it('renders the players name', () => {
    const name = 'Susan';
    const wrapper = shallow(<Player name={name} />);
    expect(wrapper.find('.player__name').text()).to.equal(name);
  });

  it('renders the players vote', () => {
    const name = 'David';
    const vote = 5;
    const wrapper = shallow(<Player name={name} vote={vote} />);
    expect(+wrapper.find('.player__vote').text()).to.equal(vote);
  });

  describe('when no vote is prop is provided', () => {
    it('renders an empty string ', () => {
      const name = 'Brian';
      const wrapper = shallow(<Player name={name} />);
      expect(wrapper.find('.player__vote').text()).to.equal('');
    });
  });
});
