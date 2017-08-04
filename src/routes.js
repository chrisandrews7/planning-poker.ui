import React from 'react';
import { Route } from 'react-router';
import SetupContainer from './containers/Setup';
import BoardContainer from './containers/Board';

export default (
  <Route>
    <Route path="/" component={SetupContainer} />
    <Route path="/:gameId" component={BoardContainer} />
  </Route>
);
