import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalStats({ nickname, guess }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        
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

