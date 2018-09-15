import React from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const Card = props => (
  <div className="card" {...props}>
    <span className="card__centre">{props.value}</span>
  </div>
);

Card.propTypes = {
  value: PropTypes.string.isRequired
};

export default Card;
