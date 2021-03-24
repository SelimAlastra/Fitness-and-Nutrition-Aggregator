import React, { useEffect, useState } from 'react';
import { Container, CardGroup } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getPost} from "../../actions/posts";
import { useParams } from "react-router-dom";
import Post from "../Posts/Post/Post";
import { getBucket } from '../../actions/buckets';
import Navbar from '../Navbar/Navbar';

const BucketView = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    console.log(id);

    const bucket = useSelector((state) => state.buckets);

    useEffect(() => {
            dispatch(getBucket(id));
    }, []);

    const post = bucket.postsId;

    console.log(bucket);

    console.log(post);

    if (post === undefined || post.length === 0) {
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
            {post.map((post)=> (
                 <Post post={post} />
                )
            )
            }
            </> 
        );
    }
}

export default BucketView;