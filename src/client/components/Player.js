import React, { Component, PropTypes } from 'react';

export default class Player extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    vote: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }

  render() {
    const { name, vote } = this.props;
    return (
      <div className="player">
        <div className="player__name">{name}</div>
        <div className="player__vote">{vote || ''}</div>
      </div>
    );
  }
}
