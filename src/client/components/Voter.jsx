import React from 'react';

export default class Voter extends React.Component {
  static propTypes = {
    options: React.PropTypes.array.isRequired,
    onVote: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="voter">
        {this.props.options.map((value, index) =>
          <button key={index} onClick={this.props.onVote.bind(null, value)}>
            {value}
          </button>
        )}
      </div>
    );
  }
}
