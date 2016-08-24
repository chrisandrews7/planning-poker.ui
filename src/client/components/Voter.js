import React, { PropTypes } from 'react';

const Voter = props => (
  <div className="voter">
    {props.options.map((value, index) =>
      <button key={index} onClick={props.onVote.bind(null, value)}>
        {value}
      </button>
    )}
  </div>
);

Voter.propTypes = {
  options: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired
};

export default Voter;
