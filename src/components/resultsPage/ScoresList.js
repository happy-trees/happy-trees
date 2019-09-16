import React, { useState, useEffect } from 'react';
import Score from './Score';
import PropTypes from 'prop-types';
import getScores from '../../services/getScoresApi';
import { Link } from 'react-router-dom';


const ScoresList = () => {

  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScores()
      .then(setScores).catch(alert);
  });

  const scoresList = scores.map(score => {
    return <Score nickName={score.nickName} score={score.score} key={score.id} />;
  });

  return (
      <>
      <h1>Game Results</h1>
      <div>
        <h3>Scores</h3>
        {scoresList}
      </div>
      <div>
        {/* fix buttons to link to home page and landingPage */}
        <Link to="/">
          <button>Home</button>
        </Link>
        <button>Play Again</button>
      </div>
      </>
  );
};

ScoresList.propTypes = {
  scores: PropTypes.array
};

export default ScoresList;
