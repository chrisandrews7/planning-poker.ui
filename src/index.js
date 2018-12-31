import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import config from 'enviro-conf';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import configureStore from './store/configureStore';
import GameContainer from './containers/Game';
import HomeContainer from './containers/Home';

const SERVER_URL = config.get('SERVER_URL');

const socket = io(SERVER_URL, {
  autoConnect: false
});
const store = configureStore(undefined, socket);

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/:gameId" component={GameContainer} />
      </Switch>
    </Router>
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);
