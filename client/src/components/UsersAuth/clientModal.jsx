import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Login from './userLogin';
import Register from './userRegister';
import { Container } from 'react-bootstrap';

function PopUpLogin(){
  
  const [login, setLogin] = useState(true);
  const handleLogin = () => setLogin(true);
  const handleRegister = () => setLogin(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkClient = "true";
  return(
    <>
    <Button className="landingButton1" onClick={handleShow}>
      Basic Users
    </Button>
    <div className = "modal-dialog">
    <Modal className="logIn" show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          <Container login={login}>
            <Button onClick={handleLogin}>LOG IN</Button>
            <Button onClick={handleRegister}>SIGN UP</Button>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { login == true ?
        <Login checkClient = {checkClient}/>
        :
        <Register checkClient = {checkClient}/>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  </>
  );

};

export default PopUpLogin;