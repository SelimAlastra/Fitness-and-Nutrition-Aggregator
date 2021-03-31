import React, { useState , useEffect} from 'react';
import { CardContent, Button, TextField, TextareaAutosize} from '@material-ui/core/';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {deleteBucket, updateBucket} from '../../actions/buckets';
import UpdateBucket from './UpdateBucket';

const Bucket = ({ bucket }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();

    const bucketToEdit = {
        bucketId: bucket._id
    }

    const handleDelete = (bucketId) => {
        if (window.confirm("Are you sure you want to delete this bucket?"))
            dispatch(deleteBucket(bucketId));
    }
    
    return (
        <div>
        <CardContent style={{"alignContent" : "center"}}>
        <LinkContainer style={{"fontWeight" : "bold"}} to={{pathname:`/user/myBuckets/${bucket._id}/${bucket.title}`}}>
            <Button>
                {bucket.title}
            </Button>
        </LinkContainer>
        <div>{bucket.postsId.length} Posts</div>
        </CardContent>
        <Button onClick= {() => handleDelete(bucket._id)}>
            Delete
        </Button>
        <UpdateBucket bucketToEdit={bucketToEdit}/>
        </div>
    );
}


export default Bucket;