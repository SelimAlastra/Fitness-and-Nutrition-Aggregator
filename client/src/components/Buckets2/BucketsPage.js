import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, GridList } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';

import Bucket from './Bucket';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { getBuckets } from '../../actions/buckets';
import './BucketsPage.css';

const Buckets = ({ setCurrentBucketId }) => {
    const buckets = useSelector((state) => state.buckets);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const myBuckets = buckets.filter(bucket => bucket.userId === userId);

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
                                    <Bucket bucket={bucket} setCurrentBucketId={setCurrentBucketId} />
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