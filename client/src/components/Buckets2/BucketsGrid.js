import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, CardActions, CardContent, Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateBucket, getBuckets } from '../../actions/buckets';
import { Form, FormCheck, ListGroup, Col } from 'react-bootstrap';
import "./BucketsGrid.css";

const Buckets = (post) => {

    let postID = post.postToAdd.postId;
    const [currentBucketId, setCurrentBucketId] = useState(null);
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));

    const myBuckets = useSelector((state) => user._id ? state.buckets.filter((b) => b.userId === user._id) : null);

    const addToBucket = (postId, bucketId) => {
        const bucket = myBuckets.find((bucket) => bucket._id === bucketId);
        if (bucket.postsId.indexOf(postId) === -1) {
            bucket.postsId.push(postId);
            dispatch(updateBucket(bucket._id, bucket));
        }
    }

    const removeFromBucket = (postId, bucketId) => {
        const bucket = myBuckets.find((bucket) => bucket._id === bucketId);
        const post = bucket.postsId.indexOf(postId);
        if(post > - 1)
        {
            bucket.postsId.splice(post, 1);
            dispatch(updateBucket(bucket._id, bucket));
        }
    }

    if (myBuckets === undefined || myBuckets.length === 0) {
        return (
            <div>
                You have no buckets.
            </div>
        )
    }
    else {
        return (
            <div className = "row">
                {myBuckets.map((bucket) => (
                    <Col xs={6} md={4} lg={3} key={bucket._id}>
                        <Card className = "bucketCard">
                            <Button className = "bucketButton"
                                bucket={bucket}
                                currentBucketId={currentBucketId}
                                setCurrentBucketId={setCurrentBucketId}
                                onClick={() => addToBucket(postID, bucket._id)}
                                onSecondClick={() => removeFromBucket(postID, bucket._id)}
                                style ={{ "width" : "100%", "height" : "100%"}}
                                >
                                {bucket.title}
                            </Button>
                        </Card>
                    </Col>
                ))}
        </div>
        );
    }
}

export default Buckets;