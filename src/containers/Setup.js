import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startNewGame } from '../actions/user';

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ startNewGame }, dispatch);

export const mapStateToProps = () => ({});

export class Setup extends Component {
  static propTypes = {
    startNewGame: PropTypes.func.isRequired
  }

  handleChange(key) {
    return ({ target }) => {
      this.setState({
        [key]: target.value
      });
    };
  }

  render() {
    return (
      <div>
        <h1>Setup</h1>
        <button onClick={this.props.startNewGame}>Create New Game</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
