import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createBucket } from '../../actions/buckets';
import Form from 'react-bootstrap/Form';
import './BucketModal.css';

function PopUpNewBuckets() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [postData, setPostData] = useState({ title: '' });
    const dispatch = useDispatch();
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            title: postData.title,
            postId: postData.postId,
            userId: userId
        }
        dispatch(createBucket(newData));
        handleClose();
    }
    
    return (<> 
    <Button className="createButton"
        onClick={handleShow} >
        Create a new bucket 
    </Button>
            <Modal className="newBucket" show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    < Modal.Title> Create a new bucket </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        {/* <Typography variant="h6">{currentBucketId ? 'Editing' : 'Creating' } a Bucket</Typography> */}
                        <Form.Label htmlFor="title">Bucket Name</Form.Label>
                        <Form.Control id="title" name="title" variant="outlined" onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                        <Form.Label htmlFor="description">Description (optional)</Form.Label>
                        <textarea className="bucketText" id="description" placeholder ="Write the description here" name="description"/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bucketSave" variant="primary" size="large" type="submit">Save</Button>
                </Modal.Footer>
            </Modal>
    </>
    );
};

export default PopUpNewBuckets;