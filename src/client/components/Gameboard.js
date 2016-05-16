import React, { Component, PropTypes } from 'react';
import { map, isEmpty } from 'lodash';
import { NO_PLAYERS } from '../../shared/constants/dictionary';
import Player from './Player';

export default class Gameboard extends Component {
  static propTypes = {
    players: PropTypes.objectOf(
      PropTypes.shape({
        name: React.PropTypes.string,
        vote: PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ])
      })
    )
  }

  render() {
    const { players } = this.props;
    return (
      <div className="gameboard">
        {!isEmpty(players) ? map(players, (player, index) =>
          <Player key={index} name={player.name} vote={player.vote} />
        ) : NO_PLAYERS}
      </div>
    );
  }
}
