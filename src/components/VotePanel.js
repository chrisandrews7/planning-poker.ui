import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const VotePanel = ({ options, onVote }) => (
  <div className="vote-panel row">
    {options.map(value => (
      <Card key={`option-${value}`} onClick={() => onVote(value)} value={value} />
    ))}
  </div>
);

VotePanel.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVote: PropTypes.func.isRequired
};

export default VotePanel;
