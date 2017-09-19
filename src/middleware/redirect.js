import { browserHistory } from 'react-router';

export default () => next => (action) => {
  if (action.meta && action.meta.redirect) {
    browserHistory.push(`${action.meta.redirect}`);
  }
  return next(action);
};
