import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import _ from 'lodash';
import faker from 'faker';
import sinon from 'sinon';
import React from 'react';
import Voter from '../../../../src/client/components/Voter';

describe('Voter Component', () => {
  it('renders a list of vote buttons using the options prop values', () => {
    const options = _.times(3, () => String(faker.random.number()));
    const wrapper = shallow(<Voter options={options} onVote={() => {}} />);

    const voteOptions = wrapper.find('button').map(node => node.text());
    expect(voteOptions).to.deep.equal(options);
  });

  it('fires the callback function in props on click of an option', () => {
    const options = [faker.random.number()];
    const spy = sinon.spy();
    const wrapper = mount(<Voter options={options} onVote={spy} />);

    wrapper.find('button').simulate('click');
    expect(spy.calledWith(options[0])).to.equal(true);
  });
});
