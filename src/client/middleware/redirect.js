import { browserHistory } from 'react-router';

export default () => next => action => {
  if (action.redirect) {
    browserHistory.push(`${action.redirect}`);
  }
  return next(action);
};
