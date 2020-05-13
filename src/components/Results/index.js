import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { PieChart } from 'react-minimal-pie-chart';
import Result from '../Result';
import colours from '../../constants/colours';
import './styles.less';

const Results = ({ results }) => {
  const groupedResults = results.reduce((group, result) => {
    const value = group[result] ? group[result].value + 1 : 1;
    return {
      ...group,
      [result]: {
        title: result,
        value,
        percentage: Math.round((value / results.length) * 100)
      }
    };
  }, {});
  const orderedResults = orderBy(groupedResults, ['value'], ['desc']);

  return (
    <div className="results">
      <PieChart
        className="results__chart"
        animate
        data={orderedResults.map((rProps, index) => ({
          ...rProps,
          color: colours[index]
        }))}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          fontSize: '0.37rem',
          fill: '#FFF'
        }}
      />
      <div className="results__key row">
        {orderedResults.map((rProps, index) => (
          <Result key={rProps.title} className="col-12 col-lg-6" {...rProps} colour={colours[index]} />
        ))}
      </div>
    </div>
  );
};

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Results;
