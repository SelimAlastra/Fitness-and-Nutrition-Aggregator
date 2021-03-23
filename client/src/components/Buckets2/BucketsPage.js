import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, GridList, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import BucketContent from './BucketContent';
import Bucket from './Bucket';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { getBuckets } from '../../actions/buckets';
import './BucketsPage.css';

const Buckets = ({ setCurrentBucketId }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const myBuckets = useSelector((state) => user._id ? state.buckets.filter((b) => b.userId === user._id) : null);

    const history = useHistory();
    
    if (myBuckets === undefined || myBuckets.length === 0) {
        return (
            <div>
                You have no buckets.
            </div>
        )
    }
    else {
        return (
            <div>
                <Navbar />
                <div class="container">
                    <div class="row">
                        {myBuckets.map((bucket) => (
                            <Col xs={6} md={4}>
                                <div class="card">
                                    <Button
                                     bucket={bucket} 
                                     setCurrentBucketId={setCurrentBucketId}
                                     onClick={() => history.push(`/user/myBuckets/${user._id}/${bucket.title}`)}>{bucket.title}
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const BucketPage = () => {
    const [currentBucketId, setCurrentBucketId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBuckets());
    }, [currentBucketId, dispatch]);

    return (
        <Buckets
            style={{ "justifyContent": "space-between" }}
            currentBucketId={currentBucketId}
            setCurrentBucketId={setCurrentBucketId}
        />
    );
}

export default BucketPage;