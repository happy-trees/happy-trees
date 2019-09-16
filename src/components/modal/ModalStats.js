import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalStats({ nickname, guess }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} backdrop={'static'} keyboard={false} onHide={handleClose}>

        <Modal.Title>Round Stats</Modal.Title>

        <Modal.Body>
          Winner {nickname} {'\n'}
          Answer {guess}
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

