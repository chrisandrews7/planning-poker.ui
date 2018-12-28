import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JoinContainer from './Join';
import BoardContainer from './Board';
import { CONNECTION_ERROR } from '../constants/dictionary';

export const mapStateToProps = state => ({
  name: state.getIn(['user', 'name']),
  connected: state.getIn(['game', 'connected'])
});

export class Game extends Component {
  static propTypes = {
    name: PropTypes.string,
    connected: PropTypes.bool.isRequired
  }

  static defaultProps = {
    name: undefined
  }

  render() {
    if (this.props.name) {
      return (
        <div className="container">
          {!this.props.connected && (
            <div className="alert alert-danger" role="alert">
              {CONNECTION_ERROR}
            </div>
          )}
          <BoardContainer {...this.props} />
        </div>
      );
    }

    return (
      <div className="container">
        <JoinContainer {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Game);
