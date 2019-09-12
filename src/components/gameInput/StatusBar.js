import React from 'react';
import PropTypes from 'prop-types';
import styles from './statusbar.css';

function StatusBar({ guess, handleChange }) {
  return (
    <div className={styles.StatusBar} >
      <div className={styles.round}>1 of 5</div>
      <div className={styles.timerContainer}>timer</div>
      <div className={styles.currentArtist}>{guess}Danny</div>
      <label className={styles.brushTitle}htmlFor="brush">Brush Color</label>
      <input type="color" id="brush" name="brush" value="#FF914D" onChange={handleChange} />
    </div>
  );

}
StatusBar.propTypes = {
  guess: PropTypes.string,
  handleChange: PropTypes.func
};

export default StatusBar;
