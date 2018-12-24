import subscribe from './subscribe';

export default socket => (store) => {
  subscribe(socket, store.dispatch, store.getState);
  return next => action => next(action);
};
