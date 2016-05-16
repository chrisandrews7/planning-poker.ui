import React, { Component, PropTypes } from 'react';

export default class Voter extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onVote: PropTypes.func.isRequired
  };

  render() {
    const { options, onVote } = this.props;
    return (
      <div className="voter">
        {options.map((value, index) =>
          <button key={index} onClick={onVote.bind(null, value)}>
            {value}
          </button>
        )}
      </div>
    );
  }
}
