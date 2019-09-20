import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getScores } from '../../selectors/socketSelectors';
import styles from './results.css';

const Results = ({ scores }) => {
  const result = () => {
    if(scores[0].score !== scores[1].score) {
      return (
        <section className={styles.resultsSection}>
          <h2 className={styles.resultTitle}>FIRST PLACE</h2>
          <h3>{scores[0].user.nickname} - {scores[0].score} pts</h3>
          <h2 className={styles.resultTitle}>SECOND PLACE</h2>
          <h3>{scores[1].user.nickname} - {scores[1].score} pts</h3>
        </section>
      );
    } else {
      return (
        <section className={styles.resultsSection}>
          <h2 className={styles.resultTitle}>It was a tie!</h2>
          <h3>Both players had {scores[0].score} points!</h3>
        </section>
      );
    }
  };
  return (
    <>
    <h1 className={styles.Logo}>Happy Trees</h1>
    <section className={styles.resultsBox}>
      <h1 className={styles.resultHeader}>Results</h1>
      {result()}
      <Link to="/">
        <button>
          Home
        </button>
      </Link>
    </section>
    </>
    
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
