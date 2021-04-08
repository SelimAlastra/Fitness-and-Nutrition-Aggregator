import React, { useEffect, useState } from 'react';
import { Button, Col, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getPostsFromArray } from "../../actions/posts";
import { useParams } from "react-router-dom";
import Post from "../Posts/Post/Post";
import { updateBucket, getBuckets, getBucket } from '../../actions/buckets';
import NavbarUser from '../Navbar/NavbarUser';
import { getProfessional } from '../../api';
import { getProfessionalUsers } from '../../actions/professionals';

const BucketView = () => {

    const { id } = useParams();

    let bucket = useSelector((state) => id ? state.buckets.find((bucket) => bucket._id === id) : null);

    const posts = useSelector((state) => state.posts);

    const loading = true;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsFromArray(id));
        dispatch(getBuckets());
        dispatch(getProfessionalUsers());
    }, [dispatch]);

    
    const removeFromBucket = (postId) => {
        const post = bucket.postsId.indexOf(postId);
        if(post > - 1)
        {
            bucket.postsId.splice(post, 1);
            dispatch(updateBucket(id, bucket))
            window.location.reload();
        }
    }

    if(!bucket) {
        return (
            <>
            <NavbarUser/>
                <>
                    Loading....
                </>
            </>
        )
    } else if ((posts === undefined || posts.length === 0) && !loading) {
        return (
            <>
            <NavbarUser/>
            <div>
                You have no posts.
            </div>
            </>
        )
    }
    else
    {
        return(
            <div style={{backgroundColor: "whitesmoke", overflowX: "hidden", height:'100%', minHeight:'100vh'}}>
            <NavbarUser/>
            <h1 style={{margin : '30px'}}>{bucket.title}</h1>
            <h5>{bucket.description}</h5>
            <hr/>
            <div style={{marginLeft: "2%"}} class="row">
                {posts.map((post)=> (
                    <Col xs={6} lg={4} key={post._id}>
                        <Post post={post} />
                        <Button className="removePost" style={{marginLeft: "-10%", marginBottom: "4%"}} onClick = {() => (removeFromBucket(post._id))}>REMOVE</Button>
                    </Col>
                ))}
            </div>
            </div>
        );        
    }
}

export default BucketView;