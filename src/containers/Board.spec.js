import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import { fromJS } from 'immutable';
import * as redux from 'redux';
import PlayerList from '../components/PlayerList';
import VotePanel from '../components/VotePanel';
import Results from '../components/Results';
import VoteOptions from '../constants/voting';
import { mapStateToProps, mapDispatchToProps, Board } from './Board';
import { resetVotes } from '../actions/game';
import { setVote } from '../actions/user';
import * as playerSelectors from '../selectors/players';

describe('Board Container', () => {
  const initialState = {
    players: {},
    allVoted: false
  };
  const initialProps = {
    setVote: () => {},
    resetVotes: () => {},
    params: {}
  };
  const connect = (state, props) => shallow(
    <Board {...initialState} {...state} {...initialProps} {...props} />
  );

  describe('mapStateToProps()', () => {
    it('returns the players, gameId, voted and current vote state', () => {
      stub(playerSelectors, 'selectAllPlayers').returns('players');
      const mockState = {
        game: {
          gameId: 'Game123',
          allVoted: true,
          players: {}
        },
        user: {
          vote: '5'
        }
      };

      expect(mapStateToProps(fromJS(mockState))).to.deep.equal({
        players: 'players',
        gameId: mockState.game.gameId,
        allVoted: mockState.game.allVoted,
        vote: mockState.user.vote
      });
    });
  });

  describe('mapDispatchToProps()', () => {
    it('returns setVote bound to the dispatch', () => {
      const bindACStub = stub(redux, 'bindActionCreators');
      const fakeDispatch = spy();

      mapDispatchToProps(fakeDispatch);
      expect(bindACStub).to.have.been.calledWith({ setVote, resetVotes }, fakeDispatch);
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
          .find('.card-header h4')
          .text()
      ).to.equal(`Game: ${gameId}`);
    });

    it('renders the VotePanel component with the options, onVote and current vote', () => {
      const setVoteSpy = spy();

      const wrapper = connect({
        gameId: 'Game9876',
        vote: '5'
      }, { setVote: setVoteSpy });

      const props = wrapper
        .find(VotePanel)
        .props();

      expect(props.options).to.deep.equal(VoteOptions);
      expect(props.selectedValue).to.deep.equal('5');

      props.onVote('vote');
      expect(setVoteSpy).to.have.been.calledWith('vote');
    });

    it('renders a link to share the game', () => {
      const state = {
        gameId: 'GameTest'
      };
      const wrapper = connect(state);

      expect(
        wrapper
          .find('.card-footer a')
          .props()
          .href
      ).to.equal(window.location.href);
    });

    describe('when clicking the reset vote button', () => {
      it('resets the voting', () => {
        const props = {
          resetVotes: spy()
        };
        const wrapper = connect({}, props);
        wrapper.find('.card-header button').simulate('click');

        expect(props.resetVotes).to.have.been.calledOnce;
      });
    });

    describe('when players are still voting', () => {
      it('renders the PlayerList component with the list of players', () => {
        const players = {
          1234: {
            name: 'Usain',
            vote: '15'
          }
        };
        const state = {
          players,
          gameId: 'Game789'
        };
        const wrapper = connect(state);

        expect(
          wrapper
            .find(PlayerList)
            .props()
            .players
        ).to.deep.equal(players);
      });
    });

    describe('when players have finished voting', () => {
      it('renders the Results component with the results', () => {
        const players = {
          1234: {
            name: 'Usain',
            vote: '15'
          },
          5678: {
            name: 'Zara',
            vote: '?'
          }
        };
        const state = {
          players,
          gameId: 'Game789',
          allVoted: true
        };
        const wrapper = connect(state);

        expect(
          wrapper
            .find(Results)
            .props()
            .results
        ).to.deep.equal(['15', '?']);
      });
    });
  });
});
