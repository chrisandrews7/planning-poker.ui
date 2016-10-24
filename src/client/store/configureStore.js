import { createStore, applyMiddleware } from 'redux';
import freeze from 'redux-freeze';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  freeze,
)(createStore);

export default function (initialState) {
  return createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
}
