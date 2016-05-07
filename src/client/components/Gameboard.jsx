import React from 'react';
import { NO_PLAYERS } from '../../shared/constants/dictionary';
import Player from './Player';

export default class Gameboard extends React.Component {
  static propTypes = {
    players: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string
      })
    )
  }

  static defaultProps = {
    players: []
  }

  render() {
    return (
      <div className="gameboard">
        {this.props.players.length ? this.props.players.map((score, index) =>
          <Player key={index} name={score.name} vote={score.vote} />
        ) : NO_PLAYERS}
      </div>
    );
  }
}
