import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function PlayButton({ playGame }) {
  return (
    <Link to={'/game'} >
      <button onSubmit={playGame}> Let&apos;s Draw </button>
    </Link>
  );
}

PlayButton.propTypes = {
  playGame: PropTypes.func
};

export default PlayButton;
