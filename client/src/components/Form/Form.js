import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';


import useStyles from './styles';
import './styles.css';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ creator: JSON.parse(localStorage.getItem('user')).username, userFrom: JSON.parse(localStorage.getItem('user'))._id, title: '', message: '', tags: '', selectedFile: '', url: '', audioFile: '', embeddedLink: '', facebookLink: '' });
    const [option, setOption] = useState('option1')
    let Value = 'photo';
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        if (Value == 'photo') {
            setPostData({ ...postData, url: '' });
        }
        if (Value == 'video') {
            setPostData({ ...postData, selectedFile: '' });
        }

        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        }
        else {
            dispatch(createPost(postData));
            window.location.reload();
        }
        clear();
    }

    const setValue = (x) => {
        Value = x;
        if (Value == 'photo')
            setPostData({ ...postData, url: '' });
        else {
            setPostData({ ...postData, selectedFile: '' });
        }
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: JSON.parse(localStorage.getItem('user')).username, userFrom: JSON.parse(localStorage.getItem('user'))._id, title: '', message: '', tags: '', selectedFile: '', url: '', audioFile: '', embeddedLink: '', facebookLink: '' });
    }
    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} method="post" action="#" onSubmit={handleSubmit}>

            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} required onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} required onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} required onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

            <Typography style={{ "font-weight": "bold"}}>Post Type:</Typography>

            <div style={{ width: "100%", alignItems: "center"}}>
                <div>
                    <input type="radio" name="choice-post" value="photo" onChange={(e) => setValue(e.target.value)} required />
                    <label>Photo Post</label>
                    <div className="reveal-if-active" >
                        <label>Upload Photo</label>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    </div>
                </div>
                <div>
                    <input type="radio" name="choice-post" value="video" onChange={(e) => setValue(e.target.value)} required />
                    <label>Video Post</label>
                    <div className="reveal-if-active" >
                        <label>Upload Video</label>
                        <TextField name="url" variant="outlined" label="URL" fullWidth value={postData.url} onChange={(e) => setPostData({ ...postData, url: e.target.value })} />
                    </div>
                </div>
                <div>
                    <input type="radio" name="choice-post" value="audio" onChange={(e) => setValue(e.target.value)} required />
                    <label>Audio Post</label>
                    <div className="reveal-if-active" >
                        <label>Upload Audio</label>
                        <TextField name="src" variant="outlined" label="URL/File" fullWidth value={postData.audioFile} onChange={(e) => setPostData({ ...postData, audioFile: e.target.value })} />
                        {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, audioFile: base64 })} /> */}
                    </div>
                </div>
                <div>
                    <input type="radio" name="choice-post" value="embeddedlink" onChange={(e) => setValue(e.target.value)} required />
                    <label>Embedded Link Post</label>
                    <div className="reveal-if-active" >
                        <label>Upload Link</label>
                        <TextField name="src" variant="outlined" label="URL" fullWidth value={postData.embeddedLink} onChange={(e) => setPostData({ ...postData, embeddedLink: e.target.value })} />
                    </div>
                </div>
                <div>
                    <input type="radio" name="choice-post" value="facebooklink" onChange={(e) => setValue(e.target.value)} required />
                    <label>Facebook Post</label>
                    <div className="reveal-if-active" >
                        <label>Upload Link</label>
                        <TextField name="src" variant="outlined" label="URL" fullWidth value={postData.facebookLink} onChange={(e) => setPostData({ ...postData, facebookLink: e.target.value })} />
                    </div>
                </div>
            </div>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={6}>
                    <Button className="postFormSubmit" variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className="postFormClear" variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default Form;


