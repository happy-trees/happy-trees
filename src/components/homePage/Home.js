import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from './PlayButton';

function Home({ nickname }) {

  return (
    <>
    <p>{nickname}</p>
    <PlayButton />
    </>
  );
}

Home.propTypes = {
  nickname: PropTypes.string
};

export default Home;
