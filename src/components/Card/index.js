import React from 'react';
import PropTypes from 'prop-types';

const Card = props => (
  <div className="card" {...props}>
    <div className="card__centre">{props.value}</div>
  </div>
);

Card.propTypes = {
  value: PropTypes.string.isRequired
};

export default Card;
