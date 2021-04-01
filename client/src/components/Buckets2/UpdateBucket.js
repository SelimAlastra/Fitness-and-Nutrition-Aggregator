import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBucket, updateBucket} from '../../actions/buckets';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateBucketForm(bucket) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    let bucketId = bucket.bucketToEdit.bucketId;
    const editBucket = {
        bucketID: bucketId
    }

    const bucketToEdit = useSelector((state) => state.bucketToEdit);

    useEffect(() => {
        dispatch(getBucket(bucketId));
    }, [dispatch])

    return (< >
        < Button class="bucket button"
            size="medium"
            onClick={handleShow} >
            EDIT
        </Button>
        < div className="modal-dialog" >
            < Modal className="editBucket" show={show} onHide={handleClose} >
                < Modal.Header closeButton >
                    < Modal.Title> Edit bucket</Modal.Title >
                </ Modal.Header >
                < Modal.Body >
                    < UpdateFormBucket bucketToEdit={bucketToEdit}/>
                </Modal.Body>
            </Modal >
        </div>
    </>
    );
};

const UpdateFormBucket = ({bucketToEdit}) => {
    const dispatch = useDispatch();

    //let bucketId = bucket.editBucket.bucketID;
        
    const [postData, setPostData] = useState("");
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        setPostData(bucketToEdit.title);
    }, [bucketToEdit])

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            title: postData.title,
            postId: postData.postId,
            userId: userId
        }
        dispatch(updateBucket(bucketToEdit._id, newData));
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