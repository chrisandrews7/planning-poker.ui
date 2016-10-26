import React, { PropTypes } from 'react';

const VotePanel = ({ options, onVote }) => (
  <div className="voter">
    {options.map((value, index) =>
      <button key={index} onClick={onVote.bind(null, value)}>
        {value}
      </button>
    )}
  </div>
);

VotePanel.propTypes = {
  options: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired
};

export default VotePanel;
