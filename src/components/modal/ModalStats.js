import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import styles from './modal.css';

function ModalStats({ countdown, guesses, roundWinner, isPlaying }) {
  
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
    }
  };

  return (
    <>
      <Modal show={show} backdrop={'static'} keyboard={false} onHide={handleClose}>

        <div className={styles.modal}>
          <Modal.Title><h1 className={styles.modalHeader}>Round Stats</h1></Modal.Title>
          <Modal.Body>

            {hasRoundWinner()}

            Other guesses: 
            <ul> 
              {allGuesses}
            </ul>
            <p>Get Ready, next round in: {countdown}</p>

          </Modal.Body>

          {!isPlaying && <Modal.Footer>
            <Button 
              className={styles.modalButton} 
              variant="secondary" 
              onClick={handleClose}
            >
                Close 
            </Button>
          </Modal.Footer>}
        </div>
      </Modal>
    </>
  );
}

ModalStats.propTypes = {
  guesses: PropTypes.array,
  countdown: PropTypes.number,
  roundWinner: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired
};

export default ModalStats;

