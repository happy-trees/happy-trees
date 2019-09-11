import React from 'react';
import PropTypes from 'prop-types';

function GameInput({ guess, handleSubmit, handleChange  }) {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="guess" value={guess} onChange={handleChange} />
    </form>
  );

}

GameInput.propTypes = {
  guess: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};

export default GameInput;
