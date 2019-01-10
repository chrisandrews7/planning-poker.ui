import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';

import subscribeMiddleware from '../middleware/socket';
import publishMiddleware from '../middleware/socket/publish';

export default function (initialState, socket) {
  // @todo: Use new dev tool extention method
  const createStoreWithMiddleware = applyMiddleware(
    publishMiddleware(socket),
    subscribeMiddleware(socket)
  )(createStore);

  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
  );

  return store;
}
