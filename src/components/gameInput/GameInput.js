import React from 'react';
import PropTypes from 'prop-types';

function GameInput({ guess, handleSubmit, handleOnChange  }) {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="guess" value={guess} onChange={handleOnChange} />
    </form>
  );

}

GameInput.propTypes = {
  guess: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleOnChange: PropTypes.func
};

export default GameInput;
