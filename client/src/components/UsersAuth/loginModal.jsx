import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Login from './userLogin';

function PopUpLogin(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button className="loginButton" variant="outline-success" variant="primary" onClick={handleShow}>
      Login
    </Button>
    <div className = "modal-dialog">
    <Modal className="logIn" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>LOGIN FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body> <Login/> </Modal.Body>
    </Modal>
    </div>
  </>
  );

};

export default PopUpLogin;