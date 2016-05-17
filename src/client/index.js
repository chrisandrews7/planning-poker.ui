import React from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const history = browserHistory;

render(
  <Root store={store} history={history} />,
  document.body.appendChild(document.createElement('div'))
);
