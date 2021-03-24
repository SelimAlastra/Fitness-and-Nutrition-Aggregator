import React, { useEffect, useState } from 'react';
import { Container, CardGroup, Breadcrumb } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getPost, getPostsFromArray } from "../../actions/posts";
import { useParams } from "react-router-dom";
import Post from "../Posts/Post/Post";
import { getBucket } from '../../actions/buckets';
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
                 <Post post={post} />
                )
            )
            }
            </> 
        );
    }
}

export default BucketView;