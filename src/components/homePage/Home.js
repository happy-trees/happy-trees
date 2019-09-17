import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from './PlayButton';
import styles from './Home.css';

function Home({ nickname, avatar }) {
  return (
    <div className={styles.Home}>
      <h1>{nickname}</h1>
      <img className={styles.Avatar} src={avatar} />
      <PlayButton />
    </div>
  );
}

Home.propTypes = {
  nickname: PropTypes.string,
  avatar: PropTypes.string
};

export default Home;
