import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { map } from 'lodash';
import { NO_PLAYERS } from '../constants/dictionary';
import PlayerList from './PlayerList';
import Player from './Player';

describe('PlayerList Component', () => {
  describe('when no player prop has is provided', () => {
    it('renders a message ', () => {
      const wrapper = shallow(<PlayerList />);
      expect(wrapper.text()).to.equal(NO_PLAYERS);
    });
  });

  describe('when an empty player prop is provided', () => {
    it('renders a message ', () => {
      const wrapper = shallow(<PlayerList players={{}} />);
      expect(wrapper.text()).to.equal(NO_PLAYERS);
    });
  });

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
