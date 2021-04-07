import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createBucket } from '../../actions/buckets';
import {Form , Container} from 'react-bootstrap';
import './BucketModal.css';

function PopUpNewBuckets() {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => 
    {
        setShow(false);
        setErrors({});
    }
    const handleShow = () => setShow(true);

    const [postData, setPostData] = useState({ title: '', description: '' });
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const [ errors, setErrors ] = useState({})

    const findFormErrors = () => {
        const { title } = postData
        const newErrors = {}
        if ( !title || title === '' ) newErrors.title = 'Name is required!'
        else if ( title.length > 20 ) newErrors.title = 'Name must be maximum 20 characters long!'
    
        return newErrors
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            const newErrors = findFormErrors()
            if ( Object.keys(newErrors).length > 0 ) {
                    setErrors(newErrors)
            } else {
                const newData = {
                    title: postData.title,
                    description: postData.description,
                    postId: postData.postId,
                    userId: userId
                }
                setPostData({...postData, title:"", description:""})
                dispatch(createBucket(newData));
                handleClose();
            }
    }
    
    return (<> 
    <Button className="createButton"
        data-testid="createNewbucket"
        onClick={handleShow} >
        Create a new bucket 
    </Button>
            <Modal className="newBucket" show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    < Modal.Title> Create a new bucket </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="createForm" autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Label htmlFor="title">Bucket Name (maximum 20 characters)</Form.Label>
                        <Form.Control className="bucketTitle" id="title" name="title" variant="outlined" isInvalid={ !!errors.title } onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                        <Form.Control.Feedback type='invalid'>
                            { errors.title }
                        </Form.Control.Feedback>
                        <p/>
                        <Form.Label style={{marginBottom: "-10%"}} htmlFor="description">Description (optional)</Form.Label>
                        <textarea className="editText" rows={3} id="description" name="description" onChange={(e) => setPostData({ ...postData, description: e.target.value })}/>
                        <Container className ='center'>
                        <Button className="bucketSave" variant="primary" size="large" type="submit">Save</Button>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
    </>
    );
};

export default PopUpNewBuckets;