import { expect } from 'chai';
import sinon from 'sinon';
import * as eventConstants from '../../../constants/events';
import * as player from '../../../handlers/player';

describe('Player Handler', () => {
  describe('Vote', () => {
    it('should emit VOTING_CHANGED when called', () => {
      const socket = {
        emit: sinon.spy()
      };
      player.vote.call(socket, {});
      expect(socket.emit.calledWith(eventConstants.VOTING_CHANGED)).to.be.ok;
    });
  });
});
