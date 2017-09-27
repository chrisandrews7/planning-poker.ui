import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';

import redirectMiddleware from '../middleware/redirect';
import socketMiddleware from '../middleware/socket';

import socketListener from '../listeners/socket';

export default function (initialState, socket) {
  const createStoreWithMiddleware = applyMiddleware(
    redirectMiddleware,
    socketMiddleware(socket)
  )(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension()
  );
  socketListener(socket, store.dispatch);

  return store;
}
