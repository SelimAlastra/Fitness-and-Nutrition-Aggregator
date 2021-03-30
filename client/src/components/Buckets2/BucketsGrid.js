import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateBucket, getBuckets } from '../../actions/buckets';
import { ListGroup } from 'react-bootstrap';

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
        window.location.reload();
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
            <ListGroup>
                {myBuckets.map((bucket) => (
                    <ListGroup.Item action key={bucket._id} item="true" xs={12} sm={6}>
                        <Button bucket={bucket}
                            currentBucketId={currentBucketId}
                            setCurrentBucketId={setCurrentBucketId}
                            onClick={() => addToBucket(postID, bucket._id)}
                            >
                            {bucket.title}</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    }
}

export default Buckets;