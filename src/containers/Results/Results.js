import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getScores } from '../../selectors/socketSelectors';

const Results = ({ scores }) => {
  console.log(scores);
  return (
    <section>
      <h1>Results</h1>
      <Link to="/">
        <button>
          Home
        </button>
      </Link>
    </section>
    
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
