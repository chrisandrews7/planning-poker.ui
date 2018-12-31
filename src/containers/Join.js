import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setName } from '../actions/user';
import { joinGame, setGameId } from '../actions/game';
import { ENTER_NAME } from '../constants/dictionary';

export const mapDispatchToProps = dispatch => bindActionCreators({
  joinGame,
  setName,
  setGameId
}, dispatch);

export class Join extends Component {
  static propTypes = {
    setName: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired,
    setGameId: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        gameId: PropTypes.string
      }).isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    this.props.setGameId(this.props.match.params.gameId);
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
        <h1 className="display-4">Join</h1>
        <form className="form-inline" onSubmit={this.joinGame}>
          <div className="form-group mb-2">
            <input
              type="text"
              id="name"
              className="form-control"
              aria-label={ENTER_NAME}
              placeholder={ENTER_NAME}
              value={this.state.name}
              onChange={this.setName}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
          >
              Join
          </button>

        </form>
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(Join);
