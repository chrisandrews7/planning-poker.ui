import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import React from 'react';
import VotePanel from './VotePanel';

describe('VotePanel Component', () => {
  it('renders a list of vote buttons using the options prop values', () => {
    const options = ['1', '5', '13'];
    const wrapper = shallow(<VotePanel options={options} onVote={() => {}} />);

    const voteOptions = wrapper.find('button').map(node => node.text());
    expect(voteOptions).to.deep.equal(options);
  });

  describe('when the button is clicked', () => {
    it('invokes the callback function in props', () => {
      const options = ['13'];
      const callbackSpy = spy();
      const wrapper = mount(<VotePanel options={options} onVote={callbackSpy} />);

      wrapper.find('button').simulate('click');
      expect(callbackSpy.calledWith('13')).to.equal(true);
    });
  });
});
