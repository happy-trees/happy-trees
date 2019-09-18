import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from './PlayButton';
import styles from './Home.css';
import BobPositive from '../../assets/BobPositive.png';


function Home({ nickname }) {
  return (
    <div className={styles.Home}>
      <h1>{nickname}</h1>
      <img className={styles.Avatar} src={BobPositive} />
      <PlayButton />
    </div>
  );
}

Home.propTypes = {
  nickname: PropTypes.string
};

export default Home;
