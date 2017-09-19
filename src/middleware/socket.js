import { get } from 'lodash';

export default socket => () => next => (action) => {
  if (get(action, 'meta.emit.type')) {
    socket.emit(action.meta.emit.type, action.meta.emit.params);
  }
  return next(action);
};
