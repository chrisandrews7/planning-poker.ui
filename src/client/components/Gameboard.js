import React, { PropTypes } from 'react';
import { map, isEmpty } from 'lodash';
import { NO_PLAYERS } from '../../shared/constants/dictionary';
import Player from './Player';

const Gameboard = props => (
  <div className="gameboard">
    {!isEmpty(props.players) ? map(props.players, (player, index) =>
      <Player key={index} name={player.name} vote={player.vote} />
    ) : NO_PLAYERS}
  </div>
);

Gameboard.propTypes = {
  players: PropTypes.objectOf(
    PropTypes.shape({
      name: React.PropTypes.string,
      vote: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    })
  )
};

export default Gameboard;
