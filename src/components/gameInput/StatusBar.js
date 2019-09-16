import React from 'react';
import PropTypes from 'prop-types';
import styles from './statusbar.css';


function StatusBar({ nickname, handleChange }) {
  return (
    <div className={styles.StatusBar}>
      <div className={styles.round}>1 of 5</div>
      <div className={styles.timerContainer}>timer</div>
      <div className={styles.currentArtist}>Drawer: {nickname}</div>
      <div className={styles.colorPicker}>
        {/* <label className={styles.brushTitle}htmlFor="brush">Brush Color</label>
        <input className={styles.brushBar} type="color" id="brush" name="brush" value="#FF914D" onChange={handleChange}/> */}
      </div>
    </div>
  );

}
StatusBar.propTypes = {
  nickname: PropTypes.string,
  handleChange: PropTypes.func
};

export default React.memo(StatusBar);
