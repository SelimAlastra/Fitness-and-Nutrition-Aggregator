import React,{useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';
import { getPosts, updatePost } from '../../actions/posts';

const Posts = ({setCurrentId,updatedPosts,setUpdatedPosts}) => {
    var newPosts=[];
    for(var i=0; i<updatedPosts.length;i++)
    {
        newPosts.push(updatedPosts[i]._id);
    }
    const posts =useSelector((state) => state.posts.filter((post) => newPosts.includes(post._id)));
    const classes = useStyles();
    const dispatch =useDispatch();
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
                {posts.map((post) => (
                       <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId} updatedPosts={updatedPosts}/>
                       </Grid> 
                ))}
            </Grid>
        )
    );
}

export default Posts;