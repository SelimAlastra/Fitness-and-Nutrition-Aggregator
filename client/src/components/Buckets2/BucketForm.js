import React, { useState , useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch , useSelector} from 'react-redux';
import { createBucket} from '../../actions/buckets';
import * as Yup from "yup";

const FormBucket = ({currentBucketId, setCurrentBucketId}) => {
    const [postData, setPostData] = useState({ title: ''});
    const bucket = useSelector((state) => currentBucketId ? state.buckets.find((p)=> p._id === currentBucketId ) : null);
    const dispatch = useDispatch();

    useEffect(() => {
       if(bucket) setPostData(bucket);
    }, [bucket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBucket(postData));
    }

    const schema = Yup.object().shape({
        title: Yup.string()
            .required("Cannot create a bucket without a name!")
            .max(30, "Name too long - maximum 30 chars")
    });

    return (
            <Form autoComplete="off" validate={schema} onSubmit={handleSubmit}>
                {/* <Typography variant="h6">{currentBucketId ? 'Editing' : 'Creating' } a Bucket</Typography> */}
                <Form.Label htmlFor="title">Bucket Name</Form.Label>
                <Form.Control id="title" name="title" variant="outlined" onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <Button variant="contained" color="primary" size="large" type="submit">Save</Button>
            </Form>
    );
}

export default FormBucket;