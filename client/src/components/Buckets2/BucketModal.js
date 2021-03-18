import Modal from 'react-bootstrap/Modal';
import {FaFolderPlus} from "react-icons/fa";
import React, { useState , useEffect} from 'react';
import { Button } from '@material-ui/core';
import FormBucket from './BucketForm.js';
import BucketList from './BucketList.js';
import './BucketModal.css';


function PopUpBuckets(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button size="small" color="primary" onClick={handleShow}>
    <FaFolderPlus/>                  
    </Button>
    <div className = "modal-dialog">
    <Modal className="bucket" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add this post to a bucket</Modal.Title>
      </Modal.Header>
      <Modal.Body><BucketList/></Modal.Body>
      <Modal.Footer>
          <PopUpNewBuckets/>
      </Modal.Footer>
    </Modal>
    </div>
  </>
  );

};

function PopUpNewBuckets(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button class="bucket button" size="medium" color="primary" onClick={handleShow}>
    Create a new bucket                 
    </Button>
    <div className = "modal-dialog">
    <Modal className="newBucket" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new bucket</Modal.Title>
      </Modal.Header>
      <Modal.Body><FormBucket/></Modal.Body>
    </Modal>
    </div>
  </>
  );

};

export default PopUpBuckets;