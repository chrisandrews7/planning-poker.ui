import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';

import socketMiddleware from '../middleware/socket/';

export default function (initialState, socket) {
  // @todo: Use new dev tool extention method
  const createStoreWithMiddleware = applyMiddleware(
    socketMiddleware(socket)
  )(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension()
  );

  return store;
}
