import React from 'react';
import PropTypes from 'prop-types';

function LandingPage({ handleSubmit, handleChange, nickname }) {

  return (
      <>
        <h1>Choose Nickname:</h1>
        <form>
          <input type="text" name="nickname" value={nickname} onChange={handleChange} />
          <button onSubmit={handleSubmit}>Enter Game</button>
        </form>
      </>
  );
}

LandingPage.propTypes = {
  handleSubmit: PropTypes.func,
  nickname: PropTypes.string,
  handleChange: PropTypes.func
};

export default LandingPage;
