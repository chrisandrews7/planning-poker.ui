import React, { PropTypes } from 'react';

const VotePanel = ({ options, onVote }) => (
  <div className="vote-panel">
    {options.map(value => (
      <button key={`option-${value}`} onClick={() => onVote(value)}>
        {value}
      </button>
    ))}
  </div>
);

VotePanel.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVote: PropTypes.func.isRequired
};

export default VotePanel;
