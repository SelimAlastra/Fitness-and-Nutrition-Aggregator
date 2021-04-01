import React, { useState , useEffect} from 'react';
import { CardContent, Button, TextField, TextareaAutosize} from '@material-ui/core/';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {deleteBucket, updateBucket} from '../../actions/buckets';
import UpdateBucket from './UpdateBucket';
import './Bucket.css';

const Bucket = ({ bucket }) => {

    const dispatch = useDispatch();

    const handleDelete = (bucketId) => {
        if (window.confirm("Are you sure you want to delete this bucket?"))
            dispatch(deleteBucket(bucketId));
    }
    
    return (
        <div>
            <div style={{"alignContent" : "center", marginTop : "5%", justifyContent : "center", alignItems : "center"}}>
                <LinkContainer to={{pathname:`/user/myBuckets/${bucket._id}/${bucket.title}`}}>
                    <Button>
                        <h5 style={{"fontWeight" : "bold", alignSelf: "center"}}>{bucket.title}</h5>
                    </Button>
                </LinkContainer>
                <p style={{marginBottom: "30%"}}>{bucket.postsId.length} Posts</p>
                <div style={{marginBottom: "10%"}}>
                    <Button onClick= {() => handleDelete(bucket._id)}>
                        Delete
                    </Button>
                    <UpdateBucket bucket={bucket}/>
                </div>
            </div>
        </div>
    );
}


export default Bucket;