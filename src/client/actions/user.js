import { SET_USER, SET_ROOM } from '../constants/actionTypes';

export function setUser(name) {
  return {
    type: SET_USER,
    name
  };
}

export function setRoom(room) {
  return {
    type: SET_ROOM,
    room
  };
}
