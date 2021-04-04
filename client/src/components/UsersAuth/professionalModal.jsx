import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Login from './userLogin';
import Register from './userRegister';
import { Container } from 'react-bootstrap';
import './usersModal.css';

function PopUpProfessional(){
  
  const [login, setLogin] = useState(true);
  const handleLogin = () => setLogin(true);
  const handleRegister = () => setLogin(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <Button className="landingButton2" onClick={handleShow}>
      Providing the change?
    </Button>
    <div className = "modal-dialog">
    <Modal className="logIn" show={show} onHide={handleClose}>
      <Modal.Header className="modalHeaderLoginRegister">
        <Modal.Title>
          <Container login={login}>
            <Button className="loginButtonModal2"onClick={handleLogin}>LOG IN</Button>
            <Button className="registerButtonModal2"onClick={handleRegister}>SIGN UP</Button>
          </Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { login == true ?
        <Login/>
        :
        <Register/>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button className="closeButtonModal" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  </>
  );

};

export default PopUpProfessional;