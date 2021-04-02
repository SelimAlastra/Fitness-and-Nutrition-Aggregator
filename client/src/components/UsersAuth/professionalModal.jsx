import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Login from './userLogin';
import Register from './userRegister';
import './usersModal.css';
import { Link } from 'react-router-dom';

function PopUpProfessional(){
  
  const [login, setLogin] = useState(true);
  const handleLogin = () => setLogin(true);
  const handleRegister = () => setLogin(false);

  const [show, setShow] = useState(false);
  const handleClose = () => 
  {
    setLogin(true);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  return(
    <>
    <Button className="landingButton2" onClick={handleShow}>
      Providing the change?
    </Button>
    <div className = "modal-dialog">
    <Modal className="logIn" show={show} onHide={handleClose}>
      <Modal.Header className="modalHeaderLoginRegister" login={login} closeButton>
          <Modal.Title>Welcome to Fitness Aggregator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { login == true ?
        <div>
        <Login/>
        <Link className="redirectLinkLogin" onClick={()=>{handleRegister()}}>Don't have an account? Sign up!</Link>
        </div>
        :
        <div>
        <Register/>
        <Link className="redirectLinkRegister" onClick={()=>{handleLogin()}}>Already a user? Log in!</Link>
        </div>
        }
      </Modal.Body>
    </Modal>
    </div>
  </>
  );

};

export default PopUpProfessional;