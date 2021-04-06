import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBucket, updateBucket} from '../../actions/buckets';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EditIcon from '@material-ui/icons/Edit';
import './BucketModal.css';

function UpdateBucketForm({bucket}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setTitle(bucket.title);
        setDescription(bucket.description);
    }, [bucket])

    function handleSubmit(e) {
        e.preventDefault();
        const newData = {
            title : title,
            description : description
        }
        console.log(newData)
        dispatch(updateBucket(bucket._id, newData));
        handleClose();
    }

    return (< >
        < Button className="editBucketBP"
            size="medium"
            onClick={handleShow} >
            <EditIcon/>
        </Button>
        < div className="modal-dialog" >
            < Modal className="editBucket" show={show} onHide={handleClose} >
                < Modal.Header closeButton >
                    < Modal.Title> Edit bucket</Modal.Title >
                </ Modal.Header >
                < Modal.Body >
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Label htmlFor="title">Bucket Name</Form.Label>
                        <Form.Control className="bucketTitle" id="title" name="title" variant="outlined" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                        <p/>
                        <Form.Label htmlFor="description">Description (optional)</Form.Label>
                        <textarea className = "editText" rows={3} id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <Button className="bucketSave" variant="primary" size="large" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal >
        </div>
    </>
    );
};

export default UpdateBucketForm;