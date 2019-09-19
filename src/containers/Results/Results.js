import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScores } from '../../selectors/socketSelectors';

const Results = ({ scores }) => {
  console.log(scores);
  return (
    <h1>Results</h1>
  );
};

Results.propTypes = {
  scores: PropTypes.array.isRequired
};


const mapStateToProps = (state) => ({
  scores: getScores(state)
});


export default connect(
  mapStateToProps,
  null
)(Results);
