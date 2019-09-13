import React from 'react';
import PropTypes from 'prop-types';

function PlayButton({ playGame }) {
  return (
    <button onSubmit={playGame}> Let&apos;s Draw </button>
  );
}

PlayButton.propTypes = {
  playGame: PropTypes.func
};

export default PlayButton;
