import { addPlayer, updateVote, removePlayer } from '../actions/players';

export default (socket, dispatch) => {
  socket.on('playerJoined', ({ playerId }) =>
    dispatch(addPlayer(playerId)));

  socket.on('playerLeft', ({ playerId }) =>
    dispatch(removePlayer(playerId)));

  socket.on('voteUpdated', ({ playerId, vote }) =>
    dispatch(updateVote(playerId, vote)));
};
