import React from 'react';
import Scoreboard from './Scoreboard';

export default class App extends React.Component {
  render() {
    const scores = [{
      name: 'Mr Test',
      vote: 11
    }, {
      name: 'Mr Robot',
      vote: 5
    }];

    return (
      <div>
        <Scoreboard scores={scores} />
      </div>
    );
  }
}
