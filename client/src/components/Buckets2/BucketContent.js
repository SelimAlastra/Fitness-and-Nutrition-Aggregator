import React, { useEffect, useState } from 'react';
import { Container, CardGroup } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from "../../actions/posts";
import { useParams } from "react-router-dom";
import Post from "../Posts/Post/Post";
import { getBuckets } from '../../actions/buckets';

const BucketView = () => {

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));

    const bucket = useSelector((state) => user._id ? state.buckets.filter((b) => b.userId === user._id) : null);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getBuckets(id));
    }, []);

    
    useEffect(() => {
            dispatch(getPost());
    }, [bucket]);

    console.log(bucket);


    const post = useSelector((state) => state.posts);

    console.log(post)

    return(
        <>
        {post.map((post) => (
                <CardGroup xs={12} sm={2}> <Post post={post} /> </CardGroup>
        ))}
        </>
    );
}

export default BucketView;