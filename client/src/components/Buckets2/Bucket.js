import React, { useState , useEffect} from 'react';
import { CardContent, Button, TextField, TextareaAutosize} from '@material-ui/core/';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {deleteBucket, updateBucket} from '../../actions/buckets';
import UpdateBucket from './UpdateBucket';
import './Bucket.css';
import { Link } from 'react-router-dom';
import ReactPhotoGrid from 'react-image-gallery';
import {getPosts, getPostsFromArray } from '../../actions/posts';

const Bucket = ({ bucket }) => {

    const dispatch = useDispatch();

    // const posts = useSelector((state) => state.posts);

    // useEffect(() => {
    //     if (bucket) {
    //         dispatch(getPostsFromArray(bucket._id)) 
    //     }
    // }, [bucket]);

    // console.log(posts); 

    // var imageData = [
    //     posts
    // ]

    const handleDelete = (bucketId) => {
        if (window.confirm("Are you sure you want to delete this bucket?"))
            dispatch(deleteBucket(bucketId));
    }
    
    return (
        <div>
            <div style={{"alignContent" : "center", marginTop : "5%", justifyContent : "center", alignItems : "center"}}>
                <Link to={{pathname:`/user/myBuckets/${bucket._id}/${bucket.title}`, state: bucket}}>
                    <Button>
                        <h5 style={{"fontWeight" : "bold", alignSelf: "center"}}>{bucket.title}</h5>
                    </Button>
                </Link>
                <p style={{marginBottom: "30%"}}>{bucket.postsId.length} Posts</p>
                <div style={{marginBottom: "10%"}}>
                    <Button onClick= {() => handleDelete(bucket._id)}>
                        Delete
                    </Button>
                    <UpdateBucket bucket={bucket}/>
                </div>
            </div>
            {/* <ReactPhotoGrid
                // data={imageData} 
            /> */}
        </div>
    );
}


export default Bucket;