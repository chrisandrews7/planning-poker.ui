import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ name, vote }) => (
  <li className="player list-group-item d-flex justify-content-between align-items-center">
    {name}
    <span className="player__vote badge badge-info badge-pill">{vote && '✓'}</span>
  </li>
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
