import React from 'react';
import { Route } from 'react-router';
import Join from './containers/Join';
import Board from './containers/Board';

export default (
  <Route>
    <Route path="/" component={Join} />
    <Route path="/:boardId" component={Board} />
  </Route>
);
