import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import config from 'enviro-conf';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import configureStore from './store/configureStore';
import GameContainer from './containers/Game';

const SERVER_URL = config.get('SERVER_URL');

const socket = io(SERVER_URL);
const store = configureStore(undefined, socket);

render(
  <Provider store={store}>
    <Router>
      <Route path="/:gameId" component={GameContainer} />
    </Router>
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);
