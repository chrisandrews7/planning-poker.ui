import React from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import io from 'socket.io-client';
import config from 'enviro-conf';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const socket = io(config.get('SERVER_URL'));
const store = configureStore(undefined, socket);

render(
  <Root store={store} history={browserHistory} />,
  document.body.appendChild(document.createElement('div'))
);
