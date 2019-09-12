import React from 'react';
import PropTypes from 'prop-types';

function StatusBar({ guess, handleChange }) {
  return (
    <div className="StatusBar" >
      <div className="round">1 of 5</div>
      <div className="timer-container">timer</div>
      <div className="current-artist">{guess}Danny</div>

      <label htmlFor="brush">Brush </label>
      <input type="color" id="brush" name="brush" value="#FF914D" onChange={handleChange} />

    </div>
  );

}

StatusBar.propTypes = {
  guess: PropTypes.string,
  handleChange: PropTypes.func
};

export default StatusBar;
