import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Player from './Player';

const PlayerList = ({ players }) => (
  <ul className="player-list list-group">
    {map(players, player => <Player key={player.id} name={player.name} vote={player.vote} />)}
  </ul>
);

PlayerList.propTypes = {
  players: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    vote: PropTypes.string
  })
};

PlayerList.defaultProps = {
  players: undefined
};

export default PlayerList;
