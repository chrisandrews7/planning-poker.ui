import socket from 'socket.io';

const io = socket();

io.on('connection', function (socket) {
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

export default io;
