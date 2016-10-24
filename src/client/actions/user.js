import * as types from '../constants/actionTypes';

export function setUser(id) {
  return {
    type: types.SET_USER,
    id
  };
}
