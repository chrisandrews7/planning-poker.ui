import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Result from '../Result';
import Results from '.';

describe('Results', () => {
  it('renders a pie chart', () => {
    const wrapper = shallow(<Results results={['test1', 'test1', 'test2']} />);

    expect(wrapper.find(PieChart)).to.be.ok;
  });

  it('sets the size of each portion based on the total occurences of each unique result', () => {
    const wrapper = shallow(<Results results={[
      'test1',
      'test1',
      'test1',
      'test1', // 4 occurences
      'test2',
      'test2', // 2 ocurrences
      'test3' // 1 occurence
    ]}
    />);

    const titles = wrapper.find(PieChart).props().data.map(node => node.title);
    expect(titles).to.deep.equal(['test1', 'test2', 'test3']);

    const values = wrapper.find(PieChart).props().data.map(node => node.value);
    expect(values).to.deep.equal([4, 2, 1]);
  });

  it('renders a chart key with the results', () => {
    const wrapper = shallow(<Results results={['test1', 'test1', 'test2']} />);

    const titles = wrapper.find(Result).map(node => node.props().title);
    expect(titles).to.deep.equal(['test1', 'test2']);

    const values = wrapper.find(Result).map(node => node.props().value);
    expect(values).to.deep.equal([2, 1]);
  });

  it('renders a chart key with the calulated percentages', () => {
    const wrapper = shallow(<Results results={[
      'test1',
      'test1',
      'test1', // 3 occurences 75%
      'test2' // 1 occurence 25%
    ]}
    />);

    const percentages = wrapper.find(Result).map(node => node.props().percentage);
    expect(percentages).to.deep.equal([75, 25]);
  });
});
