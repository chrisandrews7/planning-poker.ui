import idGenerator from '../utils/idGenerator';
import { SET_USER, SET_ROOM } from '../constants/actionTypes';

function setUser(name) {
  return {
    type: SET_USER,
    name
  };
}

function setRoom(room) {
  return {
    type: SET_ROOM,
    room
  };
}

function startNewRoom() {
  return setRoom(idGenerator.generateShortId());
}

export default {
  setUser,
  setRoom,
  startNewRoom
};
