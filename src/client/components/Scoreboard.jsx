import React from 'react';
import { NO_SCORES } from '../../shared/constants/dictionary';
import Player from './Player';

export default class Scoreboard extends React.Component {
  static propTypes = {
    scores: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string
      })
    )
  }

  static defaultProps = {
    scores: []
  }

  render() {
    return (
      <div className="scoreboard">
        {this.props.scores.length ? this.props.scores.map((score, index) =>
          <Player key={index} name={score.name} vote={score.vote} />
        ) : NO_SCORES}
      </div>
    );
  }
}
