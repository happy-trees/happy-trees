import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from './PlayButton';
import { Link } from 'react-router-dom';

function Home({ nickname, avatar }) {
  return (
    <>
    <p>{nickname}</p>
    <img src={avatar} />
    <Link to="game">
      <PlayButton />
    </Link>
    </>
  );
}

Home.propTypes = {
  nickname: PropTypes.string,
  avatar: PropTypes.string
};

export default Home;
