import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import JoinContainer from '../../../src/client/containers/Join';

describe('Join Container', () => {
  it('should render a room input field', () => {
    const wrapper = shallow(<JoinContainer />);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should render a button', () => {
    const wrapper = shallow(<JoinContainer />);
    expect(wrapper.find('button')).to.have.length(1);
  });
});
