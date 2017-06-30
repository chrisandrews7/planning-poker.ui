import React from 'react';
import { Route } from 'react-router';
import Setup from './containers/Setup';
import Board from './containers/Board';

export default (
  <Route>
    <Route path="/" component={Setup} />
    <Route path="/:boardId" component={Board} />
  </Route>
);
