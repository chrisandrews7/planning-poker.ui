import { SET_USER, SET_ROOM } from '../constants/actionTypes';

export function setUser(id) {
  return {
    type: SET_USER,
    id
  };
}

export function setRoom(room) {
  return {
    type: SET_ROOM,
    room
  };
}
