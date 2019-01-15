import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Card from '.';

describe('Card Component', () => {
  it('renders a card', () => {
    const wrapper = shallow(<Card value="5" />);
    expect(wrapper.text()).to.equal('5');
    expect(wrapper.find('.playing-card--selected')).have.a.lengthOf(0);
  });

  it('adds all of the props', () => {
    const wrapper = shallow(<Card value="5" test="value" />);
    expect(wrapper.props().test).to.equal('value');
  });

  describe('when the selected prop is provided', () => {
    it('adds a selected class', () => {
      const wrapper = shallow(<Card value="5" test="value" selected />);
      expect(wrapper.find('.playing-card--selected')).be.ok;
    });
  });
});
