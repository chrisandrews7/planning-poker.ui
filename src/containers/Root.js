import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import GameContainer from './Game';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <Route path="/:gameId" component={GameContainer} />
        </Router>
      </Provider>
    );
  }
}
