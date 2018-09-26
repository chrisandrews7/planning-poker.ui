import React from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const Card = props => (
  <div className="playing-card" {...props}>
    <div className="playing-card__centre">{props.value}</div>
  </div>
);

Card.propTypes = {
  value: PropTypes.string.isRequired
};

export default Card;
