import React from 'react';
import PropTypes from 'prop-types';

const Score = ({ nickName, score }) => {

  return (
    <div>
      <h3>{nickName}</h3>
      <h3>{score}</h3>
    </div>
  );
};

Score.propTypes = {
  score: PropTypes.func,
  nickName: PropTypes.func
};


export default Score;
