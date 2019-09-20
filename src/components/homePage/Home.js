import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from './PlayButton';
import styles from './Home.css';
import BobPositive from '../../assets/BobPositive.png';
import Instructions from '../modal/Instructions';

function Home({ nickname, onSignOut }) {
  return (
    <div className={styles.Home}>
      <h1>{nickname}</h1>
      <img className={styles.Avatar} src={BobPositive} />

      <PlayButton />
      <Instructions />
      
      <button onClick={onSignOut}>Logout</button>
    </div>
  );
}

Home.propTypes = {
  nickname: PropTypes.string,
  avatar: PropTypes.string,
  onSignOut: PropTypes.func.isRequired
};

export default Home;
