import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBucket, updateBucket} from '../../actions/buckets';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateBucketForm({bucket}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(bucket.title);
    }, [bucket])

    function handleSubmit(e) {
        e.preventDefault();
        const newTitle = {
            title : title
        }
        console.log(newTitle)
        dispatch(updateBucket(bucket._id, newTitle));
        handleClose();
    }

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
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Label htmlFor="title">Bucket Name</Form.Label>
                        <Form.Control id="title" name="title" variant="outlined" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                        <Button variant="contained" color="primary" size="large" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal >
        </div>
    </>
    );
};

export default UpdateBucketForm;