import socketio from 'socket.io';
import player from './handlers/player';
import { CONNECTION, JOIN, VOTE } from '../shared/constants/events';

const io = socketio();

io.on(CONNECTION, (socket) => {
  socket.on(JOIN, player.join);
  socket.on(VOTE, player.vote.bind(io));
});

export default io;
