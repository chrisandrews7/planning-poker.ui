export const selectAllPlayers = state => ({
  ...state.get('players').toJS(),
  [state.getIn(['user', 'name'])]: {
    name: state.getIn(['user', 'name']),
    vote: state.getIn(['user', 'vote'])
  }
});
