import React, { useState , useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch , useSelector} from 'react-redux';

import useStyles from './styles';
import './styles.css';
import { createPost, updatePost} from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '', url: '' });
    const [option, setOption] = useState('option1')
    let Value= 'photo';
    const post = useSelector((state) => currentId ? state.posts.find((p)=> p._id === currentId ) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
       if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
      if(Value=='photo'){
        setPostData({ ...postData, url: '' });
      }
      if(Value=='video'){
        setPostData({ ...postData, selectedFile: ''});
      }
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, postData));
        }else
        {
            dispatch(createPost(postData));
        }
        clear();
    }
  
    const setValue = (x) =>{
      Value = x;
      if(Value=='photo')
      setPostData({ ...postData, url: '' });
      else
      {
        setPostData({ ...postData, selectedFile: ''});
      }
   }
    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: JSON.parse(localStorage.getItem('user')).name , title: '', message: '', tags: '', selectedFile: '', url: '' });
    }
    console.log(JSON.parse(localStorage.getItem('user')).name)
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} method="post" action="#" onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating' } a Post</Typography>
                <TextField   fullWidth value={JSON.parse(localStorage.getItem('user')).name}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <Typography>Which post do you want?</Typography>


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
                




                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
    </Paper>
    );
}

export default Form;


{/* <form method="post" action="#" onSubmit={this.handleFormSubmit}>
        <Typography>Which post do you want?</Typography>
        <div>

          <div>
            <input type="radio" name="choice-post" value="photo" checked={this.state.selectedOption === "option1"} onChange={ (e) => setValue(e.target.value) } required />
            <label>Photo Post</label>
            <div className="reveal-if-active" className={classes.fileInput} >
              <label>Upload Photo</label>
              <FileBase type="file" multiple={false} className="require-if-active" data-require-pair="#choice-post-photo" onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            </div>
          </div>

          <div>
            <input type="radio" name="choice-animals" value="option2" checked={this.state.selectedOption === "option2"} onChange={this.handleOptionChange} required />
            <label htmlFor="choice-animals-dogs">I like pigs more</label>
            <div className="reveal-if-active">
              <label htmlFor="which-dog">
                Good call. What's the name of your favorite pig?
              </label>
              <input
                type="text"
                className="require-if-active"
                data-require-pair="#choice-animals-dogs"
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div>
            <input
              type="radio"
              name="choice-animals"
              id="choice-animals-cats"
              value="option3"
              checked={this.state.selectedOption === "option3"}
              onChange={this.handleOptionChange}
              required
            />
            <label htmlFor="choice-animals-cats">I like cats more</label>
            <div className="reveal-if-active">
              <label htmlFor="which-cat">Why? Cats are weird. Respond.</label>
              <input
                type="text"
                className="require-if-active"
                data-require-pair="#choice-animals-cats"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
        <h4>Would you like a dollar?</h4>
        <div>
          <input type="checkbox" name="choice-dollar" id="choice-dollar" />
          <label htmlFor="choice-dollar">Sure.</label>
          <div className="reveal-if-active">Wouldn't we all.</div>
        </div>
        <div>
          <input type="submit" defaultValue="Submit" />
        </div>
      </form> */}