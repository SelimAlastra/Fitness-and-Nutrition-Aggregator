import React, { useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {deleteBucket, updateBucket} from '../../actions/buckets';
import UpdateBucket from './UpdateBucket';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './Bucket.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Bucket = ({ bucket }) => {

    const dispatch = useDispatch();

    const handleDelete = (bucketId) => {
        if (window.confirm("Are you sure you want to delete this bucket?"))
            dispatch(deleteBucket(bucketId));
    }
    
    return (
        <div>
            <div style={{"alignContent" : "center", marginTop : "5%", justifyContent : "center", alignItems : "center"}}>
                <Container style={{height:"75px", justifyContent: "center"}}>
                    <Link to={{pathname:`/user/myBuckets/${bucket._id}/${bucket.title}`, state: bucket}}>
                        <Button className="titleButton">
                            <h5 className="displayedTitle" style={{"fontWeight" : "bold", alignSelf: "center"}}>{bucket.title}</h5>
                        </Button>
                    </Link>
                    <hr/>
                </Container>
                <p className="postsNo" style={{marginBottom: "15%", marginTop: "5%"}}>{bucket.postsId.length} Posts</p>
                 <Button className="deleteBucketBP" onClick= {() => handleDelete(bucket._id)}>
                    <DeleteForeverIcon/>
                </Button>
                <UpdateBucket bucket={bucket}/>
            </div>
        </div>
    );
}


export default Bucket;