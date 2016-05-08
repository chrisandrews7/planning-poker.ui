import React from 'react';

export default class Player extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    vote: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])
  }

  render() {
    return (
      <div className="player">
        <div className="player__name">{this.props.name}</div>
        <div className="player__vote">{this.props.vote || ''}</div>
      </div>
    );
  }
}
