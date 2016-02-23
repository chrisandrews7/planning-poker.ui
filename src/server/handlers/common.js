export const connect = (socket) => {
  socket.emit('test', 'Welcome');
};
