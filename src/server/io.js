import socketio from 'socket.io';
import * as player from './handlers/player';
import { CONNECTED, VOTE } from './constants/events';

const io = socketio();

io.on(CONNECTED, (socket) => {
  socket.on(VOTE, player.vote.bind(socket));
});


export default io;
