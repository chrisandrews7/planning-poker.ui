import React, { Component, PropTypes } from 'react';

export default class Join extends Component {

  render() {
    return (
      <div>
        <h1>Join a room</h1>
        <input name="roomId" ref="roomId" placeholder="Room ID" />
        <button>Join</button>
      </div>
    );
  }
}
