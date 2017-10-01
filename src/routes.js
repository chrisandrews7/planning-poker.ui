import React from 'react';
import { Route } from 'react-router';
import JoinContainer from './containers/Join';

export default (
  <Route>
    <Route path="/:gameId" component={JoinContainer} />
  </Route>
);
