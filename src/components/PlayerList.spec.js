import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { map } from 'lodash';
import PlayerList from './PlayerList';
import Player from './Player';

describe('PlayerList Component', () => {
  it('renders a list of player components with the relevant props', () => {
    const votes = {
      12345: {
        id: 12345,
        name: 'Steve',
        vote: 5
      },
      67889: {
        id: 67889,
        name: 'Sandra',
        vote: 13
      }
    };
    const wrapper = shallow(<PlayerList players={votes} />);

    // Name Prop
    const playerNames = wrapper.find(Player).map(node => node.props().name);
    expect(playerNames).to.deep.equal(map(votes, 'name'));

    // Vote Prop
    const playerVotes = wrapper.find(Player).map(node => node.props().vote);
    expect(playerVotes).to.deep.equal(map(votes, 'vote'));
  });
});
