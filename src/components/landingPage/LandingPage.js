import React from 'react';
import PropTypes from 'prop-types';
import styles from './landingPage.css';

function LandingPage({ handleSubmit, nickname, handleUpdate }) {

  return (
    <div className={styles.LandingPage}>
      <h1>Choose Nickname:</h1>
      <div className={styles.Form}>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nickname" 
            value={nickname} 
            placeholder='nickname...' 
            onChange={handleUpdate}
          />
          <button>Enter</button>
        </form>
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired
};

export default LandingPage;
