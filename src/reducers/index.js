import { combineReducers } from 'redux-immutable';
import players from './players';
import user from './user';
import game from './game';

export default combineReducers({
  players,
  user,
  game
});
