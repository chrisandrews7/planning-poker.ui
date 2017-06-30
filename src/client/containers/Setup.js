import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/user';

export const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);

export const mapStateToProps = () => ({

});

export class Setup extends Component {
  static propTypes = {
    startNewGame: PropTypes.func
  }

  render() {
    const { startNewGame } = this.props;
    return (
      <div>
        <div>
          <h2>Setup</h2>
          <button onClick={startNewGame}>Create New Game</button>
        </div>
        <div>
          <h2>Join Game</h2>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
