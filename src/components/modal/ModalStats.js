import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalStats({ nickname, guess, guesses }) {
  console.log(guesses);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  
  const allGuesses = guesses.map((guess) => {
    return <li key={Math.random()}>{guess}</li>;
  });

  return (
    <>
      <Modal show={show} backdrop={'static'} keyboard={false} onHide={handleClose}>

        <Modal.Title>Round Stats</Modal.Title>

        <Modal.Body>
          Winner {nickname} {'\n'}
          <ul>
            {allGuesses}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default ModalStats;

