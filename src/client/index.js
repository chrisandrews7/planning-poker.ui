import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import Root from './containers/Root';

const store = configureStore(initialState);

render(
  <Root store={store} />,
  document.body.appendChild(document.createElement('div'))
);
