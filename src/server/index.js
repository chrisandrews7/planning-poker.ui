import http from 'http';
import io from './io';
import app from './app';

const server = http.Server(app);
io.attach(server);

export default server;
