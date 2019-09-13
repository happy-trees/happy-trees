import React from 'react';
import PropTypes from 'prop-types';

function LandingPage({ handleSubmit, nickname, handleUpdate }) {

  return (
      <>
        <h1>Choose Nickname:</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nickname" 
            value={nickname} 
            placeholder='nickname...' 
            onChange={handleUpdate}
          />
          <button>Enter Game</button>
        </form>
      </>
  );
}

LandingPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired
};

export default LandingPage;
