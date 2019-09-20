import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './modal.css';

function Instructions() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button variant="primary" onClick={handleShow}>Instructions</button>
      
      <Modal centered="centered" show={show} backdrop={'static'}
        keyboard={false} onHide={handleClose}>

        <div className={styles.modal}>
          <Modal.Title >
            <h1 className={styles.modalHeader}>Instructions</h1>
          </Modal.Title>

          <Modal.Body>
            <p>Wolcome to Happy Trees</p>
            <p>Lets learn the how to play</p>
            <ul>
              <li>There are 5 rounds in a game</li>
              <li>Each player will get a chance to draw a randomly assigned word</li>
              <li>When it is your turn to draw you will be given a word to draw</li>
              <li>If you are guessing you will have 3 chances to guess what the drawing is</li>
              <li>If it is your turn to guess you wil have 3 attempts to guess</li>
              <li>If you are guessinng you will have a hint as to how long the word is at the top of your screen</li>
              <li>Your guesses restart to 3 at the end of each round</li>
              <li>Guess correctly and you will receive 3pts</li>
              <li>If someone guesses what you are drawing you will receive 2pts</li>
            </ul>
          </Modal.Body>

          <Modal.Footer>
            <Button 
              className={styles.modalButton} 
              variant="secondary" 
              onClick={handleClose}>
              Close 
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
    
  );
}

export default Instructions;
