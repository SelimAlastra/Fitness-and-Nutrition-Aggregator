import React, { useState , useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {deleteBucket, updateBucket} from '../../actions/buckets';
import FormBucket from './BucketForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createBucket } from '../../actions/buckets';
import * as Yup from "yup";
import { getBasicUser, updateBasicUser} from '../../actions/basicUsers';
import Form from 'react-bootstrap/Form';

function UpdateBucketForm(bucket) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let bucketId = bucket.bucketToEdit.bucketId;
    const editBucket = {
        bucketID: bucketId
    }
    return (< > < Button class="bucket button"
        size="medium"
        onClick={handleShow} >
        Edit bucket </Button>
        < div className="modal-dialog" >
            < Modal className="editBucket" show={show} onHide={handleClose} >
                < Modal.Header closeButton >
                    < Modal.Title> Edit bucket </Modal.Title >
                </ Modal.Header >
                < Modal.Body >
                    < UpdateFormBucket editBucket={editBucket}/>
                </Modal.Body>
            </Modal >
        </div>
    </>
    );
};

const UpdateFormBucket = (bucket) => {

    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ title: '' });
   
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    let bucketId = bucket.editBucket.bucketID;


    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            title: postData.title,
            postId: postData.postId,
            userId: userId
        }
        dispatch(updateBucket(bucketId, newData));
        window.location.reload();
    }

    return (
        <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Label htmlFor="title">Bucket Name</Form.Label>
            <Form.Control id="title" name="title" variant="outlined" onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <Button variant="contained" color="primary" size="large" type="submit">Save</Button>
        </Form>
    );
}

export default UpdateBucketForm;