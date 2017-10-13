import { get } from 'lodash';
import listeners from './listeners';

export default socket => (store) => {
  listeners(socket, store.dispatch);

  return next => (action) => {
    if (get(action, 'meta.emit.type')) {
      socket.emit(action.meta.emit.type, action.meta.emit.params);
    }
    return next(action);
  };
};
