import subscribe from './subscribe';

export default socket => (store) => {
  subscribe(socket, store.dispatch);
  return next => action => next(action);
};
