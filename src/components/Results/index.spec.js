import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Results from '.';

describe('Results', () => {
  it('renders a bar for each unique result', () => {
    const wrapper = shallow(<Results results={['test1', 'test1', 'test2']} />);

    expect(wrapper.find('.progress-bar')).to.have.a.lengthOf(2);

    expect(wrapper
      .containsMatchingElement(
        <div>test1 (2 votes)</div>
      )).to.be.ok;

    expect(wrapper
      .containsMatchingElement(
        <div>test2 (1 votes)</div>
      )).to.be.ok;
  });

  it('sets the width of each bar based on a percentage of the total occurences of each unique result', () => {
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

    expect(wrapper
      .containsMatchingElement(
        <div style={{ width: '100%' }}>test1 (4 votes)</div>
      )).to.be.ok;

    expect(wrapper
      .containsMatchingElement(
        <div style={{ width: '50%' }}>test2 (2 votes)</div>
      )).to.be.ok;

    expect(wrapper
      .containsMatchingElement(
        <div style={{ width: '25%' }}>test3 (1 votes)</div>
      )).to.be.ok;
  });

  it('renders the bar with the most votes the full width of the component', () => {
    const wrapper = shallow(<Results results={['test1', 'test1', 'test2']} />);

    expect(wrapper
      .containsMatchingElement(
        <div style={{ width: '100%' }}>test1 (2 votes)</div>
      )).to.be.ok;
  });

  it('sorts the bars based on the results total occurences', () => {
    const wrapper = shallow(<Results results={[
      'test1',
      'test1',
      'test1',
      'test2',
      'test2',
      'test3'
    ]}
    />);

    expect(wrapper.find('.progress-bar').at(0).text()).to.equal('test1 (3 votes)');
    expect(wrapper.find('.progress-bar').at(1).text()).to.equal('test2 (2 votes)');
    expect(wrapper.find('.progress-bar').at(2).text()).to.equal('test3 (1 votes)');
  });
});
