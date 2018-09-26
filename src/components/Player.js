import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ name, vote }) => (
  <div className="player">
    <div className="player__name">{name}</div>
    <span className="player__vote">{vote}</span>
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
