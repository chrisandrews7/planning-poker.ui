import React from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash';
import { NO_PLAYERS } from '../constants/dictionary';
import Player from './Player';

const PlayerList = ({ players }) => (
  <div className="player-list">
    {!isEmpty(players) ? map(players, (player, index) =>
      <Player key={index} name={player.name} vote={player.vote} />
    ) : NO_PLAYERS}
  </div>
);

PlayerList.propTypes = {
  players: PropTypes.shape({
    name: PropTypes.string,
    vote: PropTypes.string
  })
};

PlayerList.defaultProps = {
  players: undefined
};

export default PlayerList;
