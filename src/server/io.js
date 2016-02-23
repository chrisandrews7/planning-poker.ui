import socketio from 'socket.io';
import * as common from './handlers/common';

const io = socketio();

io.on('connection', common.connect);

export default io;
