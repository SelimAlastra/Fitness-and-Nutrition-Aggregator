import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Register from './userRegister';

function PopUpSignUp(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button className="registerButton" onClick={handleShow}>
      Create an account
    </Button>
  
    <Modal className="signUp" show={show} onHide={handleClose}>
      
      <Modal.Header closeButton>
        <Modal.Title >REGISTRATION FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body> <Register/> </Modal.Body>
    </Modal>
  </>
  );
  };

  export default PopUpSignUp;