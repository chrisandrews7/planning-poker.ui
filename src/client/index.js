import React from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import Root from './containers/Root';

const store = configureStore(initialState);
const history = browserHistory;

render(
  <Root store={store} history={history} />,
  document.body.appendChild(document.createElement('div'))
);
