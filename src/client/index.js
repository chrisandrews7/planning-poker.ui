import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(
  <div>
    <App />
  </div>,
  document.body.appendChild(document.createElement('div'))
);
