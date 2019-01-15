import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import React from 'react';
import VotePanel from './VotePanel';
import Card from './Card';

describe('VotePanel Component', () => {
  it('renders a list of vote buttons using the options prop values', () => {
    const options = ['1', '5', '13'];
    const wrapper = shallow(<VotePanel options={options} onVote={() => {}} />);

    const voteOptions = wrapper.find(Card).map(node => node.props().value);
    expect(voteOptions).to.deep.equal(options);
  });

  describe('when the selectedValue is provided', () => {
    it('renders the vote option with a selected prop', () => {
      const options = ['1', '5'];
      const wrapper = shallow(<VotePanel options={options} onVote={() => {}} selectedValue="5" />);

      expect(wrapper
        .containsMatchingElement(
          <Card value="1" selected={false} />
        )).to.be.ok;

      expect(wrapper
        .containsMatchingElement(
          <Card value="5" selected />
        )).to.be.ok;
    });
  });

  describe('when the button is clicked', () => {
    it('invokes the callback function in props', () => {
      const options = ['13'];
      const callbackSpy = spy();
      const wrapper = mount(<VotePanel options={options} onVote={callbackSpy} />);

      wrapper.find(Card).simulate('click');
      expect(callbackSpy).to.have.been.calledWith('13');
    });
  });
});
