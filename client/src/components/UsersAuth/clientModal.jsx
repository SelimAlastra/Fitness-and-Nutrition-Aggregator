import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Login from './userLogin';
import Register from './userRegister';
import './usersModal.css';
import { Link } from 'react-router-dom';

function PopUpLogin(){
  
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

  const checkClient = "true";
  return(
    <>
    <Button className="landingButton1" variant="outline-success" data-testid="basicUsersButton" onClick={handleShow}>
      Clients
    </Button>
    <div className = "modal-dialog">
    <Modal className="logIn" show={show} onHide={handleClose}>
      <Modal.Header className="modalHeaderLoginRegister" login={login} closeButton>
        <Modal.Title>Welcome to Fitness Aggregator</Modal.Title>
      </Modal.Header>
      <hr className="hrModal"/>
      <Modal.Body>
        { login === true ?
        <div>
        <Login checkClient={checkClient}/>
        <Link className="redirectLinkLogin" onClick={()=>{handleRegister()}}>Don't have an account? Sign up!</Link>
        </div>
        :
        <div>
        <Register checkClient={checkClient}/>
        <Link className="redirectLinkRegister" onClick={()=>{handleLogin()}}>Already a user? Log in!</Link>
        </div>
        }
      </Modal.Body>
    </Modal>
    </div>
  </>
  );

};

export default PopUpLogin;