import React, { useEffect, useState } from 'react';
import { Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getPostsFromArray } from "../../actions/posts";
import { useParams } from "react-router-dom";
import Post from "../Posts/Post/Post";
import { getBucket, removeFromBucket, updateBucket } from '../../actions/buckets';
import Navbar from '../Navbar/Navbar';

const BucketView = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    const bucket = useSelector((state) => state.buckets);
    const loading = true;
    const posts = useSelector((state) => state.posts);

    useEffect(() => {
            dispatch(getBucket(id));
    }, []);

    useEffect(() => {
        if (bucket) {
            dispatch(getPostsFromArray(bucket._id)) 
        }
    }, [bucket]);
    
    const removeFromBucket = (postId) => {
        const post = bucket.postsId.indexOf(postId);
        if(post > - 1)
        {
            bucket.postsId.splice(post, 1);
            dispatch(updateBucket(bucket._id, bucket))
            window.location.reload();
        }
    }

    if ((posts === undefined || posts.length === 0) && !loading) {
        return (
            <>
            <Navbar/>
            <div>
                You have no posts.
            </div>
            </>
        )
    }
    else {
        return(
            <>
            <Navbar/>
            {posts.map((post)=> (
                <ListGroup>
                 <Post post={post} />
                 <Button onClick = {() => (removeFromBucket(post._id))}>Delete</Button>
                </ListGroup>
            ))}
            </> 
        );
    }
}

export default BucketView;