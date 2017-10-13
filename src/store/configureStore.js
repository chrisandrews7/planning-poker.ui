import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';

import socketMiddleware from '../middleware/socket/';
import getStateMiddleware from '../middleware/getState';

export default function (initialState, socket) {
  // @todo: Use new dev tool extention method
  const createStoreWithMiddleware = applyMiddleware(
    getStateMiddleware,
    socketMiddleware(socket)
  )(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension()
  );

  return store;
}
