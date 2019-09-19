import React from 'react';
import PropTypes from 'prop-types';
import styles from './gameinput.css';

function GameInput({ guesses, guess, handleSubmit, handleChange  }) {
  return (
    <div className={styles.InputContainer}>
      <footer>
        <section>
          <p className={styles.guess}>You have {guesses} guesses left</p>
        </section>
    
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} type="text" name="guess" value={guess} onChange={handleChange} />
          <button className={styles.button}>+</button>
        </form>
      </footer>
    </div>
    
  );

}

GameInput.propTypes = {
  guesses: PropTypes.number,
  guess: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};

export default GameInput;
