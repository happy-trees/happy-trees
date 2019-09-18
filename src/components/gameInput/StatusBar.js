import React from 'react';
import PropTypes from 'prop-types';
import styles from './statusbar.css';


function StatusBar({ handleChange, time, currentDrawer, roundNumber }) {
  return (
    <>
    <div className={styles.StatusBar}>
      <div className={styles.round}>Round<div className={styles.roundColor}>{roundNumber}</div></div>
      <div className={styles.timerContainer}>timer<div className={styles.timeColor}>{time}</div></div>
      <div className={styles.currentArtist}>Drawer<div className={styles.drawerColor}>{currentDrawer}</div></div>
      <div className={styles.colorPicker}>
        {/* <label className={styles.brushTitle}htmlFor="brush">Brush Color</label>
        <input className={styles.brushBar} type="color" id="brush" name="brush" value="#FF914D" onChange={handleChange}/> */}
      </div>
    </div>
    </>
  );

}
StatusBar.propTypes = {
  currentDrawer: PropTypes.string,
  handleChange: PropTypes.func,
  time: PropTypes.number,
  roundNumber: PropTypes.number,
};

export default React.memo(StatusBar);
