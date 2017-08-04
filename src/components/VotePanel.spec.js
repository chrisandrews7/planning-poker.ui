import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import _ from 'lodash';
import faker from 'faker';
import { spy } from 'sinon';
import React from 'react';
import VotePanel from './VotePanel';

describe('VotePanel Component', () => {
  it('renders a list of vote buttons using the options prop values', () => {
    const options = _.times(3, () => String(faker.random.number()));
    const wrapper = shallow(<VotePanel options={options} onVote={() => {}} />);

    const voteOptions = wrapper.find('button').map(node => node.text());
    expect(voteOptions).to.deep.equal(options);
  });

  it('fires the callback function in props on click of an option', () => {
    const options = [String(faker.random.number())];
    const callbackSpy = spy();
    const wrapper = mount(<VotePanel options={options} onVote={callbackSpy} />);

    wrapper.find('button').simulate('click');
    expect(callbackSpy.calledWith(options[0])).to.equal(true);
  });
});
