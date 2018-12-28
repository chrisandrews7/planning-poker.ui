import { combineReducers } from 'redux-immutable';
import game from './game';
import user from './user';

export default combineReducers({
  game,
  user
});
