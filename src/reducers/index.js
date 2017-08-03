import { combineReducers } from 'redux-immutable';
import players from './players';
import user from './user';

export default combineReducers({
  players,
  user
});
