import React, { useState , useEffect} from 'react';
import { CardContent, Button} from '@material-ui/core/';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {deleteBucket, updateBucket} from '../../actions/buckets';
import UpdateBucket from './UpdateBucket';
import Modal from 'react-bootstrap/Modal';
//import { deletePost, likePost, toggleFavAction } from '../../../actions/posts';
// removePost
const Bucket = ({ bucket }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();

    const bucketToEdit = {
        bucketId: bucket._id
    }
    
    return (
        <CardContent style={{"alignContent" : "center"}}>
        <LinkContainer to={{pathname:`/user/myBuckets/${bucket._id}/${bucket.title}`}}>
            <Button>
                {bucket.title}
            </Button>
        </LinkContainer>
        <Button onClick= {() => {dispatch(deleteBucket(bucket._id))}}>
            Delete
        </Button>
        <UpdateBucket bucketToEdit={bucketToEdit} />
        </CardContent>
                
            /* /*<div className={classes.overlay2}> 
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon fontSize="default" />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem size="small" onClick={() => setCurrentBucketId(bucket._id)}>Edit</MenuItem>
                </Menu>
            </div> */
            
            /* <CardActions className={classes.cardActions}> 
                <Button size="small" color="primary" onClick={() => dispatch(deleteBucket(bucket._id))}>
                    <DeleteIcon fontSize="small" /> 
                    Delete                   
                </Button>
            </CardActions> */

    );
}


export default Bucket;