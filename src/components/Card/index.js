import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './styles.less';

const Card = props => (
  <div className={props.className} {...props}>
    <div
      className={cx('playing-card', { 'playing-card--selected': props.selected })}
      value={props.value}
    >
      <div className="playing-card__centre">{props.value}</div>
    </div>
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

Card.defaultProps = {
  className: undefined,
  selected: false
};


export default Card;
