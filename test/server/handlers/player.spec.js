import { expect } from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import { VOTE_UPDATED, ERROR } from '../../../src/shared/constants/events';
import player from '../../../src/server/handlers/player';
import voteRepository from '../../../src/server/repositories/vote';

describe('Player Handler', () => {
  describe('Vote', () => {
    let sandbox;
    let params;
    let socketMock;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      socketMock = {
        broadcast: {
          emit: sinon.stub().returnsThis(),
          to: sinon.stub().returnsThis()
        },
        emit: sinon.spy()
      };
      params = {
        gameId: faker.random.number(),
        playerId: faker.name.firstName(),
        vote: faker.random.number(10)
      };
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should broadcast VOTE_UPDATED to the room with vote and playerId when called', async () => {
      sandbox.stub(voteRepository, 'setVote').returns(Promise.resolve());

      await player.vote.call(socketMock, params.vote, params.playerId, params.gameId);

      expect(socketMock.broadcast.to.calledWith(params.gameId)).to.be.ok;
      expect(socketMock.broadcast.emit.calledWithExactly(VOTE_UPDATED, {
        playerId: params.playerId,
        vote: params.vote
      })).to.be.ok;
    });

    it('should call the setVote function on the vote model', async () => {
      const voteMock = sandbox.stub(voteRepository, 'setVote').returns(Promise.resolve());

      await player.vote.call(socketMock, params.vote, params.playerId, params.gameId);

      expect(voteMock.calledWithExactly(params.gameId, params.playerId, params.vote)).to.be.ok;
    });

    it('should emit ERROR when a problem occurs', async () => {
      sandbox.stub(voteRepository, 'setVote').returns(Promise.reject());

      await player.vote.call(socketMock, params.vote, params.playerId, params.gameId);

      expect(socketMock.emit.calledWith(ERROR)).to.be.ok;
    });
  });
});
