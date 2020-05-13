import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Result from '.';

describe('Result', () => {
  it('renders the title', () => {
    const wrapper = shallow(<Result title="test1" value={5} percentage={100} colour="green" />);
    expect(wrapper.find('.result__title').text()).to.equal('test1');
  });

  it('renders the percentage and value', () => {
    const wrapper = shallow(<Result title="test1" value={1} percentage={100} colour="green" />);
    expect(wrapper.find('.result__value').text()).to.equal(' - 100% (1 player)');
  });

  describe('when there is more that 1 player', () => {
    it('uses the plural of player', () => {
      const wrapper = shallow(<Result title="test1" value={5} percentage={100} colour="green" />);
      expect(wrapper.find('.result__value').text()).to.equal(' - 100% (5 players)');
    });
  });
});
