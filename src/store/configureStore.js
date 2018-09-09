import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';

import listenersMiddleware from '../middleware/socket';
import emittersMiddleware from '../middleware/socket/emitters';

export default function (initialState, socket) {
  // @todo: Use new dev tool extention method
  const createStoreWithMiddleware = applyMiddleware(
    emittersMiddleware(socket),
    listenersMiddleware(socket)
  )(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension()
  );

  return store;
}
