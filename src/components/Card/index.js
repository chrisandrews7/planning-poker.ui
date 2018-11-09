import React from 'react';
import PropTypes from 'prop-types';
import './styles.less';

const Card = props => (
  <div className="col-6 col-sm-4 col-lg-3">
    <div className="playing-card" {...props}>
      <div className="playing-card__centre">{props.value}</div>
    </div>
  </div>
);

Card.propTypes = {
  value: PropTypes.string.isRequired
};

export default Card;
