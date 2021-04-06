import { getPosts } from '../../actions/posts';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavbarProfessional from "../Navbar/NavbarProfessional";
import Post from './Post/Post';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';

const ProfessionalPosts = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const posts = useSelector((state) => state.posts);
    const myPosts = posts.filter((post) => post.userFrom == user._id);
    console.log(myPosts);

    if (myPosts === undefined || myPosts.length === 0) {
        return (
        <div style={{overflowX:"hidden"}}>
            <NavbarProfessional/>
            <div className="bucketText">
                    <h1>My Posts</h1>
                    <hr className="serviceSeperator"/>
                </div>
                <div>You have no posts.</div>
        </div>
        );
    }
    else {
        return (
            <div style={{overflowX:"hidden"}}>
                <NavbarProfessional/>
                <div className="bucketText">
                    <h1>My Posts</h1>
                    <hr className="serviceSeperator"/>
                </div>
                <div style={{marginLeft: "2%"}} class="row">
                    {myPosts.map((post)=> (
                        <Col xs={6} lg={4} key={post._id}>
                            <Post post={post} />
                        </Col>
                    ))}
               </div>
            </div>
        );
    }
}

export default ProfessionalPosts;
