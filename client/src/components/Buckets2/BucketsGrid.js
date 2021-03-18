import React,{useState} from 'react';
import { Grid, CircularProgress, GridList } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Bucket from './Bucket';
import { Container, ListGroup } from 'react-bootstrap';


const Buckets = ({setCurrentBucketId}) => {
    const buckets = useSelector((state) => state.buckets);
    console.log(buckets);

    return (
        !buckets.length ? <CircularProgress /> : (
            <ListGroup> 
                {buckets.map((bucket) => (
                       <ListGroup.Item action key={bucket._id} item="true" xs={12} sm={6}>
                            <Bucket bucket={bucket} setCurrentBucketId={setCurrentBucketId} />
                       </ListGroup.Item> 
                ))}
            </ListGroup>
        )
    );
}

export default Buckets;