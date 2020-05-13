import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Results from '.';

describe('Results', () => {
  it('renders a pie chart', () => {
    const wrapper = shallow(<Results results={['test1', 'test1', 'test2']} />);

    expect(wrapper.find(PieChart)).to.be.ok;
  });

  it('sets the size of each portion based on a percentage of the total occurences of each unique result', () => {
    const wrapper = shallow(<Results results={[
      'test1',
      'test1',
      'test1',
      'test1', // 4 occurences = 100%
      'test2',
      'test2', // 2 ocurrences = 50%
      'test3' // 1 occurence = 25%
    ]}
    />);

    const { data: pieSlices } = wrapper.find(PieChart).props();

    expect(pieSlices[0]).to.have.property('title', 'test1');
    expect(pieSlices[0]).to.have.property('value', 4);

    expect(pieSlices[1]).to.have.property('title', 'test2');
    expect(pieSlices[1]).to.have.property('value', 2);

    expect(pieSlices[2]).to.have.property('title', 'test3');
    expect(pieSlices[2]).to.have.property('value', 1);
  });
});
