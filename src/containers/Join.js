import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setGame, join } from '../actions/user';
import { ENTER_NAME } from '../constants/dictionary';

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ setUser, setGame, join }, dispatch);

export const mapStateToProps = state => ({
  name: state.getIn(['user', 'name'])
});

export class Join extends Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired,
    setGame: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    name: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        gameId: PropTypes.string
      }).isRequired
    }).isRequired
  }

  static defaultProps = {
    name: undefined
  }

  componentDidMount() {
    if (this.props.match.params.gameId) {
      this.props.setGame(this.props.match.params.gameId);
    }
  }

  joinGame = () => {
    this.props.join();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder={ENTER_NAME}
          value={this.props.name}
          onChange={event => this.props.setUser(event.target.value)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Join);
