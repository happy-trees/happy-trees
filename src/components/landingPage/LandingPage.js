import React from 'react';
import PropTypes from 'prop-types';
import { getSignUp } from '../../services/guestSignUp';

function LandingPage({ handleSubmit, handleChange, nickname, avatar }) {



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
  handleChange: PropTypes.func,
  avatar: PropTypes.string
};

export default LandingPage;
