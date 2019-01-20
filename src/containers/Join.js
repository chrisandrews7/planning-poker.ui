import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setName, observe } from '../actions/user';
import { joinGame } from '../actions/game';
import { ENTER_NAME, JOIN, ENTER_OBSERVER } from '../constants/dictionary';

export const mapDispatchToProps = dispatch => bindActionCreators({
  joinGame,
  setName,
  observe
}, dispatch);

export class Join extends Component {
  static propTypes = {
    setName: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired,
    observe: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isObserver: false
    };
  }

  joinGame = (event) => {
    event.preventDefault();

    if (this.state.isObserver) {
      this.props.observe();
    }

    this.props.setName(this.state.name);
    this.props.joinGame();
  }

  setValue = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.id]: value
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <h2 className="display-4">{JOIN}</h2>
        <form onSubmit={this.joinGame}>

          <div className="form-row form-group">
            <div className="col-auto">
              <input
                type="text"
                id="name"
                placeholder={ENTER_NAME}
                value={this.state.name}
                onChange={this.setValue}
                className="form-control"
                required
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
              >
                {JOIN}
              </button>
            </div>
          </div>

          <label className="form-check form-check-label" htmlFor="isObserver">
            <input
              type="checkbox"
              id="isObserver"
              onChange={this.setValue}
              className="form-check-input"
            />
            {ENTER_OBSERVER}
          </label>

        </form>
      </div>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(Join);
