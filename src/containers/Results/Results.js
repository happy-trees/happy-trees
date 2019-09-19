import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getScores } from '../../selectors/socketSelectors';

const Results = ({ scores }) => {
  const result = () => {
    if(scores[0].score !== scores[1].score) {
      return (
        <section>
          <h2>FIRST PLACE</h2>
          <h3>{scores[0].user.nickname} - {scores[0].score} pts</h3>
          <h2>SECOND PLACE</h2>
          <h3>{scores[1].user.nickname} - {scores[1].score} pts</h3>
        </section>
      );
    } else {
      return (
        <section>
          <h3>It was a tie!</h3>
          <h3>Both players had {scores[0].score} points!</h3>
        </section>
      );
    }
  };
  return (
    <section>
      <h1>Results</h1>
      {result()}
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
