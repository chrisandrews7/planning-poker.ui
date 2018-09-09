import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { joinGame } from '../actions/user';
import { ENTER_NAME } from '../constants/dictionary';

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ joinGame }, dispatch);

export class Join extends Component {
  static propTypes = {
    joinGame: PropTypes.func.isRequired,
    name: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        gameId: PropTypes.string
      }).isRequired
    }).isRequired
  }

  static defaultProps = {
    name: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      name: undefined
    };
  }

  setName = ({ target }) => {
    this.setState({
      name: target.value
    });
  }

  joinGame = () => {
    this.props.joinGame({
      gameId: this.props.match.params.gameId,
      name: this.state.name
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder={ENTER_NAME}
          value={this.props.name}
          onChange={this.setName}
        />
        <button
          onClick={this.joinGame}
        >
          Join
        </button>
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(Join);
