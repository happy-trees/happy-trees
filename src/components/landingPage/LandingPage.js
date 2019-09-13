import React from 'react';
import PropTypes from 'prop-types';

function LandingPage({ handleSubmit, nickname }) {




  return (
      <>
        <h1>Choose Nickname:</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nickname" value={nickname} placeholder='nickname...' />
          <button>Enter Game</button>
        </form>
      </>
  );
}

LandingPage.propTypes = {
  handleSubmit: PropTypes.func,
  nickname: PropTypes.string,
  handleChange: PropTypes.func,
  avatar: PropTypes.string
};

export default LandingPage;
