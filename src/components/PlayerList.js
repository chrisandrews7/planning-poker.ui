import React from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash';
import { NO_PLAYERS } from '../constants/dictionary';
import Player from './Player';

const PlayerList = ({ players }) => (
  <ul className="player-list list-group">
    {!isEmpty(players)
      ? map(players, player => <Player key={player.id} name={player.name} vote={player.vote} />)
      : NO_PLAYERS}
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
