import React, { Component } from 'react';
import {
  APP_NAME,
  APP_DESC,
  JOIN_GAME,
  START_GAME,
  JOIN,
  START
} from '../constants/dictionary';
import './styles.less';

export class Home extends Component {
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
              <div className="input-group">
                <input
                  type="text"
                  placeholder="GameID"
                />
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  {JOIN}
                </button>
              </div>
            </div>
            <div className="col-md-6 home-panel">
              <h2 className="lead">
                {START_GAME}
                {':'}
              </h2>
              <button
                type="button"
                className="btn btn-primary"
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
