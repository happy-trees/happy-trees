import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

function ModalStats({ nickname, countdown, guesses, roundWinner }) {
  
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
          <p>Winner: {roundWinner.nickname} {'\n'} </p>
          <p>Answer: {roundWinner.answer}</p>
            Other guesses: 
          <ul> 
            {allGuesses}
          </ul>
          <p>Get Ready, next round in: {countdown}</p>
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

ModalStats.propTypes = {
  guesses: PropTypes.array,
  countdown: PropTypes.number,
  roundWinner: PropTypes.object,
};

export default ModalStats;

