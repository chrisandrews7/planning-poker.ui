import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import './styles.less';

const Results = ({ results }) => {
  const bars = results.reduce((group, result) => ({
    ...group,
    [result]: {
      value: result,
      occurence: group[result] ? group[result].occurence + 1 : 1
    }
  }), {});

  const orderedBars = orderBy(bars, ['occurence'], ['desc']);
  const maxBar = orderedBars[0].occurence;

  return (
    <div className="results">
      {orderedBars.map(({ occurence, value }) => (
        <div className="progress" key={value}>
          <div
            className="progress-bar bg-info"
            style={{
              width: `${(occurence / maxBar) * 100}%`
            }}
          >
            {`${value} (${occurence} votes)`}
          </div>
        </div>
      ))}
    </div>
  );
};

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Results;
