import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from './PlayButton';

function Home({ nickname, avatar }) {
  return (
    <>
    <p>{nickname}</p>
    <img src={avatar} />
    <PlayButton />
    </>
  );
}

Home.propTypes = {
  nickname: PropTypes.string,
  avatar: PropTypes.string
};

export default Home;
