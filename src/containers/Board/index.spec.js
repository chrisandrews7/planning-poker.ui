import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import * as redux from 'redux';
import PlayerList from '../../components/PlayerList';
import VotePanel from '../../components/VotePanel';
import VoteOptions from '../../constants/voting';
import { mapStateToProps, mapDispatchToProps, Board } from '.';
import { setVote } from '../../actions/user';
import * as playerSelectors from '../../selectors/players';


describe('Board Container', () => {
  const initialState = {};
  const initialProps = {
    setVote: () => {},
    params: {}
  };
  const connect = (state, props) => shallow(
    <Board {...initialState} {...state} {...initialProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('returns the players and gameId', () => {
      stub(playerSelectors, 'selectAllPlayers').returns('players');
      const mockState = {
        players: {},
        user: {
          gameId: 'Game123'
        }
      };

      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        players: 'players',
        gameId: mockState.user.gameId
      });
    });
  });

  describe('mapDispatchToProps()', () => {
    it('returns setVote bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub).to.have.been.calledWith({ setVote }, fakeDispatch);
    });
  });

  describe('Board', () => {
    it('renders the game ID', () => {
      const gameId = 'Game456';
      const state = {
        gameId
      };
      const wrapper = connect(state);

      expect(
        wrapper
          .find('.board-players__title')
          .text()
      ).to.equal(`Game: ${gameId}`);
    });

    it('renders the PlayerList component with the list of players', () => {
      const expectedResults = {
        1234: {
          name: 'Usain',
          vote: 15
        }
      };
      const state = {
        players: expectedResults,
        gameId: 'Game789'
      };
      const wrapper = connect(state);

      expect(
        wrapper
          .find(PlayerList)
          .props()
          .players
      ).to.deep.equal(expectedResults);
    });

    it('renders the VotePanel component with the options and the onVote method', () => {
      const setVoteSpy = spy();

      const wrapper = connect({
        gameId: 'Game9876'
      }, { setVote: setVoteSpy });

      const props = wrapper
        .find(VotePanel)
        .props();

      expect(props.options).to.deep.equal(VoteOptions);

      props.onVote('vote');
      expect(setVoteSpy).to.have.been.calledWith('vote');
    });
  });
});
