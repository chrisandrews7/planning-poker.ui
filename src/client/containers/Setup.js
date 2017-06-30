import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/user';

export const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);

export const mapStateToProps = state => ({});

export class Setup extends Component {
  static propTypes = {
    startNewRoom: PropTypes.func
  }

  render() {
    const { startNewRoom } = this.props;
    return (
      <div>
        <button onClick={startNewRoom}>Create New Room</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
