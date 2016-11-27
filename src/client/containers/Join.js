import React, { Component } from 'react';

export default class Join extends Component {

  render() {
    return (
      <div>
        <input name="roomId" ref="roomId" placeholder="Room ID" />
        <button>Join</button>
      </div>
    );
  }
}
