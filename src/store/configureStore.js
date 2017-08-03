import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import redirect from '../middleware/redirect';

const createStoreWithMiddleware = applyMiddleware(
  redirect
)(createStore);

export default function (initialState) {
  return createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension()
  );
}
