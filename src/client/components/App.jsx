import React from 'react';
import Player from './Player';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <Player name="Dave" />
        <Player name="Steve" vote={8} />
      </div>
    );
  }
}
