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
    console.log(buckets);

    return (
        <div>
        <Navbar/>
            <div class="container">
                <div class="row">
                    {buckets.map((bucket) => (
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

const BucketPage = () => {
    const [currentBucketId, setCurrentBucketId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBuckets());
    }, [currentBucketId, dispatch]);

    return (
        <Buckets style={{ "justifyContent": "space-between" }} currentBucketId={currentBucketId} setCurrentBucketId={setCurrentBucketId} />
    );
}

export default BucketPage;