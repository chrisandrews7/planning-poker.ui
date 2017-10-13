export default store => next => (action) => {
  if (typeof action === 'function') {
    return next(action(store.getState()));
  }
  return next(action);
};
