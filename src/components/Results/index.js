import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { PieChart } from 'react-minimal-pie-chart';
import './styles.less';
import colours from '../../constants/colours';

const Results = ({ results }) => {
  const groupedResults = results.reduce((group, result) => ({
    ...group,
    [result]: {
      title: result,
      value: group[result] ? group[result].value + 1 : 1
    }
  }), {});
  const orderedResults = orderBy(groupedResults, ['value'], ['desc']);

  return (
    <div className="results">
      <PieChart
        animate
        data={orderedResults.map(({ title, value }, index) => ({
          title,
          value,
          color: colours[index]
        }))}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          fontSize: '0.35rem',
          fill: '#FFFFFF'
        }}
        labelPosition={60}
      />
    </div>

  );
};

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Results;
