import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  APP_NAME,
  APP_DESC,
  ENTER_GAME,
  JOIN_GAME,
  START_GAME,
  JOIN,
  START
} from '../constants/dictionary';
import { generateShortId } from '../utils/idGenerator';
import './styles.less';

export class Home extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      gameId: ''
    };
  }

  setGameId = ({ target }) => {
    this.setState({
      gameId: target.value
    });
  }

  goToGame = (gameId = generateShortId()) => {
    this.props.history.push(`/${gameId}`);
  }

  render() {
    return (
      <div className="container home">
        <div className="jumbotron">
          <h1 className="display-4">{APP_NAME}</h1>
          <p className="lead">{APP_DESC}</p>
          <hr className="my-4" />
          <div className="row">
            <div className="col-md-6 home-panel">
              <h2 className="lead">
                {JOIN_GAME}
                {':'}
              </h2>
              <form
                className="input-group"
                onSubmit={(e) => { e.preventDefault(); this.goToGame(this.state.gameId); }}
              >
                <input
                  type="text"
                  id="gameId"
                  onChange={this.setGameId}
                  placeholder={ENTER_GAME}
                  aria-label={ENTER_GAME}
                  autoCapitalize="none"
                  required
                  minLength={4}
                />
                <button
                  type="submit"
                  className="btn btn-primary home-panel__join-btn"
                >
                  {JOIN}
                </button>
              </form>
            </div>
            <div className="col-md-6 home-panel">
              <h2 className="lead">
                {START_GAME}
                {':'}
              </h2>
              <button
                type="button"
                className="btn btn-primary home-panel__start-btn"
                onClick={(e) => { e.preventDefault(); this.goToGame(); }}
              >
                {START}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
