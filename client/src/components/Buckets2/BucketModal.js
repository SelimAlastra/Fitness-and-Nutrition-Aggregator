import Modal from 'react-bootstrap/Modal';
import {FaFolderPlus} from "react-icons/fa";
import React, { useState , useEffect} from 'react';
import { TextField, Button, Typography, Paper, TextareaAutosize } from '@material-ui/core';
import { useDispatch , useSelector} from 'react-redux';

import useStyles from './styles';
import { createBucket} from '../../actions/buckets';


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
    <Modal className="logIn" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add this post to a bucket</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
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
    <Button size="small" color="primary" onClick={handleShow}>
    Create a new bucket                 
    </Button>
    <div className = "modal-dialog">
    <Modal className="logIn" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new bucket</Modal.Title>
      </Modal.Header>
      <Modal.Body><FormBucket/></Modal.Body>
    </Modal>
    </div>
  </>
  );

};

const FormBucket = ({currentBucketId, setCurrentBucketId}) => {
    const [postData, setPostData] = useState({ title: '',description: ''});
    const bucket = useSelector((state) => currentBucketId ? state.buckets.find((p)=> p._id === currentBucketId ) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
       if(bucket) setPostData(bucket);
    }, [bucket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBucket(postData));
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentBucketId ? 'Editing' : 'Creating' } a Bucket</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Description(optional)" rowsMin={3}  fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Save</Button>
            </form>
    </Paper>
    );
}

export default PopUpBuckets;