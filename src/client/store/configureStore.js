import { createStore, applyMiddleware } from 'redux';
import freeze from 'redux-freeze';
import rootReducer from '../reducers';
import redirect from '../middleware/redirect';

const createStoreWithMiddleware = applyMiddleware(
  freeze,
  redirect
)(createStore);

export default function (initialState) {
  return createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension()
  );
}
