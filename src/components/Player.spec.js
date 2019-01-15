import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Player from './Player';

describe('Player Component', () => {
  it('renders the players name', () => {
    const name = 'Susan';
    const wrapper = shallow(<Player name={name} />);
    expect(wrapper.find('.player').text()).to.equal(name);
  });

  describe('when the user has voted', () => {
    it('renders a tick', () => {
      const name = 'David';
      const vote = 5;
      const wrapper = shallow(<Player name={name} vote={vote} />);
      expect(wrapper.find('.player__vote').text()).to.equal('✓');
    });
  });

  describe('when no vote is prop is provided', () => {
    it('renders an empty string ', () => {
      const name = 'Brian';
      const wrapper = shallow(<Player name={name} />);
      expect(wrapper.find('.player__vote').text()).to.equal('');
    });
  });
});
