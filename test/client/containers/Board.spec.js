import { expect } from 'chai';
import faker from 'faker';
import { fromJS, Map } from 'immutable';
import connectComponent from '../../fixtures/utils/connectComponent';
import PlayerList from '../../../src/client/components/PlayerList';
import VotePanel from '../../../src/client/components/VotePanel';
import VoteOptions from '../../../src/shared/constants/voting';
import BoardContainer from '../../../src/client/containers/Board';

describe('Board Container', () => {
  const initialProps = {
    params: {
      boardId: faker.random.number()
    }
  };
  const connect = (state) => connectComponent(
    BoardContainer,
    state,
    initialProps
  );

  it('should render the PlayerList component with the players in state', () => {
    const expectedResults = {
      [faker.name.firstName()]: {
        name: faker.name.firstName(),
        vote: faker.random.number()
      }
    };
    const state = fromJS({
      players: expectedResults
    });
    const wrapper = connect(state);

    expect(
      wrapper
        .find(PlayerList)
        .props()
        .players
    ).to.deep.equal(expectedResults);
  });

  it('should render the VotePanel component with the list of voting options', () => {
    const state = Map({
      players: Map()
    });
    const wrapper = connect(state);

    expect(
      wrapper
        .find(VotePanel)
        .props()
        .options
    ).to.deep.equal(VoteOptions);
  });
});
