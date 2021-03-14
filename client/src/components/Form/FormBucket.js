import React, { useState , useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch , useSelector} from 'react-redux';

import useStyles from './styles';
import { createBucket} from '../../actions/buckets';


const FormBucket = ({currentBucketId, setCurrentBucketId}) => {
    const [postData, setPostData] = useState({ title: '',postsId: ''});
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
                <TextField name="tags" variant="outlined" label="Post Ids (coma separated)" fullWidth value={postData.postsId} onChange={(e) => setPostData({ ...postData, postsId: e.target.value.split(',') })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            </form>
    </Paper>
    );
}

export default FormBucket;