import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './styles.less';

const Card = props => (
  <div className="col-6 col-sm-4 col-lg-3" {...props}>
    <div
      className={cx('playing-card', { 'playing-card--selected': props.selected })}
      value={props.value}
    >
      <div className="playing-card__centre">{props.value}</div>
    </div>
  </div>
);

Card.propTypes = {
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

Card.defaultProps = {
  selected: false
};


export default Card;
