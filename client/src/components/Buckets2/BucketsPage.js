import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, GridList, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import NavbarUser from "../Navbar/NavbarUser";

import BucketContent from './BucketContent';
import Bucket from './Bucket';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getBuckets } from '../../actions/buckets';
import './BucketsPage.css';

const Buckets = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const myBuckets = useSelector((state) => user._id ? state.buckets.filter((b) => b.userId === user._id) : null);

    return (
        <div>
        <NavbarUser/>
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
                <div class="container">
                    <div class="row">
                        {myBuckets.map((bucket) => (
                            <Col xs={6} md={4} key={bucket._id}>
                                <div className="card">
                                    <Bucket
                                     bucket={bucket} 
                                     currentBucketId = {currentBucketId}
                                     setCurrentBucketId={setCurrentBucketId}>{bucket.title}
                                    </Bucket>
                                </div>
                            </Col>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Buckets;