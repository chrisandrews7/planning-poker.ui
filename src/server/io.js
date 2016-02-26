import socketio from 'socket.io';
import * as player from './handlers/player';
import { CONNECTION, VOTE } from './constants/events';

const io = socketio();

io.on(CONNECTION, (socket) => {
  socket.on(VOTE, player.vote);
});

export default io;
