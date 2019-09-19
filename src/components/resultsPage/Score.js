import React from 'react';
import PropTypes from 'prop-types';

const Score = ({ nickName, score }) => {

  return (
    <div>
      <h3>Danny</h3>
      <h3>3</h3>
    </div>
  );
};

Score.propTypes = {
  score: PropTypes.func,
  nickName: PropTypes.func
};


export default Score;
