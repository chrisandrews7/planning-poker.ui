import listeners from './listeners';

export default socket => (store) => {
  listeners(socket, store.dispatch);
  return next => action => next(action);
};
