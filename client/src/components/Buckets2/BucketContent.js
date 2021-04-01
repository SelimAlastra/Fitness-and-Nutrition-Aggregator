import React, { useEffect, useState } from 'react';
import { Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getPostsFromArray } from "../../actions/posts";
import { useParams } from "react-router-dom";
import Post from "../Posts/Post/Post";
import { updateBucket, getBuckets } from '../../actions/buckets';
import NavbarUser from '../Navbar/NavbarUser';

const BucketView = (params) => {
    const bucket = params.location.state;
    console.log(params.location.state);
    const loading = true;
    const posts = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBuckets());
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
            <NavbarUser/>
            <div>
                You have no posts.
            </div>
            </>
        )
    }
    else {
        return(
            <>
            <NavbarUser/>
            <h1>{bucket.title}</h1>
            {posts.map((post)=> (
                <ListGroup>
                 <Post post={post} />
                 <Button onClick = {() => (removeFromBucket(post._id))}>Remove</Button>
                </ListGroup>
            ))}
            </> 
        );
    }
}

export default BucketView;