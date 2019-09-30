import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './modal.css';

function ModalStats({ countdown, guesses, roundWinner, isPlaying, word }) {
  
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  
  const allGuesses = guesses.map((guess, i) => {
    return <li key={i}>{guess}</li>;
  });

  const hasRoundWinner = () => {
    if(roundWinner) {
      return <> 
        <p>Winner: {roundWinner.nickname} </p> 
        <p>Answer: {roundWinner.answer} </p>
        </>;
    } else {
      return <p>Looks like no one got the right answer: {word}</p>;
    }
  };

  return (
    <>
      <Modal 
        centered="centered"
        show={show} 
        backdrop={'static'} 
        keyboard={false} 
        onHide={handleClose}
      >

        <div className={styles.modal}>
          <Modal.Title >
            <h1 className={styles.modalHeader}>Round Stats</h1>
          </Modal.Title>

          <Modal.Body>
            {hasRoundWinner()}
            Other guesses:

            <ul> 
              {allGuesses}
            </ul>

            {isPlaying && <p>Get Ready, next round in: {countdown}</p> }
          </Modal.Body>

          {!isPlaying && <Modal.Footer>
            <Link to="/results">
              <button 
                className={styles.modalButton} 
                variant="secondary" 
                onClick={handleClose}
              >
                Results 
              </button>
            </Link>
          </Modal.Footer>}
          
        </div>

      </Modal>
    </>
  );
}

ModalStats.propTypes = {
  guesses: PropTypes.array.isRequired,
  countdown: PropTypes.number,
  roundWinner: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  word: PropTypes.string
};

export default ModalStats;
