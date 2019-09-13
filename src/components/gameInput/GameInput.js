import React from 'react';
import PropTypes from 'prop-types';
import styles from './gameinput.css';

function GameInput({ guesses, guess, handleSubmit, handleChange  }) {
  return (
    
    <footer>
      <section>
        <aside>
          <p>You have {guesses} 3 guesses left</p>
        </aside>
      </section>

      {/* <section>
        <aside className="rounds">
          <p>Round 1{} of 5</p>
        </aside>
      </section> */}
    
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} type="text" name="guess" value={guess} onChange={handleChange} />
        <button>+</button>
      </form>
    </footer>
    
  );

}

GameInput.propTypes = {
  guesses: PropTypes.string,
  guess: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};

export default GameInput;
