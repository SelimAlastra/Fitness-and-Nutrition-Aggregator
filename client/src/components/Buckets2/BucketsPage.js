import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, GridList, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import NavbarUser from "../Navbar/NavbarUser";

import BucketModal from './BucketModal';
import Bucket from './Bucket';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getBuckets } from '../../actions/buckets';
import './BucketsPage.css';
import { getPosts } from '../../actions/posts';
import { getProfessionalUsers } from '../../actions/professionals';

const Buckets = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBuckets());
        dispatch(getProfessionalUsers());
    }, [dispatch]);

    const myBuckets = useSelector((state) => user._id ? state.buckets.filter((b) => b.userId === user._id) : null);


    if (myBuckets === undefined || myBuckets.length === 0) {
        return (
            <div style={{backgroundColor: "whitesmoke", height :"100%" ,minHeight:"100vh"}}>
            <NavbarUser/>
            <div className="bucketText">
                    <h1>My Buckets</h1>
                    <hr className="serviceSeperator"/>
                </div>
                <div style = {{margin: "20px"}}><BucketModal/></div>
                <div>You have no buckets.</div>
                <div>Create buckets and save your favourite posts for later.</div>
            </div>
        );
    }
    else {
        return (
            <div style={{backgroundColor: "whitesmoke", height :"100%" , minHeight:"100vh"}}>
                <NavbarUser/>
                <div className="bucketText">
                    <h1>My Buckets</h1>
                    <hr className="serviceSeperator"/>
                </div>
                <div style = {{margin: "20px"}}><BucketModal/></div>
                <div class="container" style={{justifyContent: "center"}}>
                <div class="row">
                        {myBuckets.map((bucket) => (
                            <Col xs={6} md={4} lg={3} key={bucket._id}>
                                <div className="card">
                                    <Bucket bucket={bucket} > {bucket.title} </Bucket>
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