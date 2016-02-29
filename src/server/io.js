import socketio from 'socket.io';
import * as player from './handlers/player';
import * as common from './handlers/common';
import * as eventConstants from '../shared/constants/events';

const io = socketio();

io.on(eventConstants.CONNECTION, (socket) => {
  socket.on(eventConstants.JOIN, common.join);
  socket.on(eventConstants.VOTE, player.vote.bind(io));
});

export default io;
