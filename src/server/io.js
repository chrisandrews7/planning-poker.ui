import socketio from 'socket.io';
import player from './handlers/player';
import common from './handlers/common';
import { CONNECTION, DISCONNECT, LEAVE, JOIN, VOTE } from '../shared/constants/events';

const io = socketio();

io.on(CONNECTION, (socket) => {
    socket.on(LEAVE, common.leave);
    socket.on(JOIN, common.join);
    socket.on(VOTE, player.vote);
});

export default io;
