import { createStore } from 'redux';
import rootReducer from '../reducers';
import defaultState from './initialState';

export default function (initialState) {
  return createStore(
    rootReducer,
    initialState
  );
}
