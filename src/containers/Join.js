import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setName } from '../actions/user';
import { joinGame } from '../actions/game';
import { ENTER_NAME, JOIN } from '../constants/dictionary';

export const mapDispatchToProps = dispatch => bindActionCreators({
  joinGame,
  setName
}, dispatch);

export class Join extends Component {
  static propTypes = {
    setName: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }


  joinGame = () => {
    this.props.setName(this.state.name);
    this.props.joinGame();
  }

  setName = ({ target }) => {
    this.setState({
      name: target.value
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <h2 className="display-4">{JOIN}</h2>
        <form className="input-group" onSubmit={this.joinGame}>
          <input
            type="text"
            id="name"
            aria-label={ENTER_NAME}
            placeholder={ENTER_NAME}
            value={this.state.name}
            onChange={this.setName}
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
          >
            {JOIN}
          </button>
        </form>
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(Join);
