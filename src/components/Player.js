import React from 'react';
import PropTypes from 'prop-types';

const Player = props => (
  <div className="player">
    <div className="player__name">{props.name}</div>
    <div className="player__vote">{props.vote || ''}</div>
  </div>
);

Player.propTypes = {
  name: PropTypes.string.isRequired,
  vote: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

Player.defaultProps = {
  vote: undefined
};

export default Player;
