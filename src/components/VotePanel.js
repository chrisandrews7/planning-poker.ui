import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const VotePanel = ({ options, onVote, selectedValue }) => (
  <div className="vote-panel row">
    {options.map(value => (
      <Card
        key={`option-${value}`}
        onClick={() => onVote(value)}
        value={value}
        selected={selectedValue === value}
      />
    ))}
  </div>
);

VotePanel.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVote: PropTypes.func.isRequired,
  selectedValue: PropTypes.string
};

VotePanel.defaultProps = {
  selectedValue: undefined
};

export default VotePanel;
