import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import config from 'enviro-conf';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const SERVER_URL = config.get('SERVER_URL');

const socket = io(SERVER_URL);
const store = configureStore(undefined, socket);

render(
  <Root store={store} />,
  document.body.appendChild(document.createElement('div'))
);
