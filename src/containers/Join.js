import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setName } from '../actions/user';
import { joinGame, setGameId } from '../actions/game';
import { ENTER_NAME } from '../constants/dictionary';

export const mapStateToProps = state => ({
  name: state.getIn(['user', 'name'])
});

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
    name: PropTypes.string.isRequired,
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
        <div className="input-group">
          <input
            type="text"
            placeholder={ENTER_NAME}
            value={this.props.name}
            onChange={this.setName}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.joinGame}
          >
           Join
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);
