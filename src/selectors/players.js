export const selectAllPlayers = state => ({
  ...state.get('players').toJS(),
  user: {
    name: state.getIn(['user', 'name']),
    vote: state.getIn(['user', 'vote'])
  }
});
