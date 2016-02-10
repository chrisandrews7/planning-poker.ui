import socketio from 'socket.io';

const io = socketio();

io.on('connection', (socket) => {
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

export default io;
