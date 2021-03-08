import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import Bucket from '../../Buckets/Bucket/Bucket';
import Buckets from '../../Buckets/Buckets';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Videos from '../Videos/Videos';
import { useSelector } from 'react-redux';
import buckets from '../../../reducers/buckets';


import { deletePost, likePost, toggleFavAction } from '../../../actions/posts';
const Post = ({ post , setCurrentId }) => {
    const classes = useStyles();
    const dispatch =useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const handleClose1 = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        /*const arrBuckets[]=openBuckets();*/
        setOpen(true);
      };

      const buckets = useSelector((state) => state.buckets);

    return (
        <Card className={classes.card}> 
            <CardMedia className={classes.media} image={post.selectedFile} title={Post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}> 
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
                    <MenuItem size="small" onClick={() => setCurrentId(post._id)}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>
                    <div>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">
                            Save to
                        </InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose1}
                            onOpen={handleOpen}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem>
                            {buckets.map((bucket) => 
                                 bucket=bucket._id.title
                            )} 
                          {/*  {buckets.map((bucket) => (
                                <MenuItem> <Button onClick={() =>dispatch(toggleFavAction(post._id))}>{bucket.title}</Button></MenuItem>
                            ))} */}
                          </MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                    </MenuItem>
                </Menu>
            </div>
            <div className={classes.details}> 
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent> 
                <Typography  variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
            </CardContent>
            <CardContent> 
                    <Videos setUrl = {post.url} />
            </CardContent>
            <CardActions className={classes.cardActions}> 
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small" /> 
                    &nbsp; Like &nbsp;
                    {post.likeCount}                    
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" /> 
                    Delete                   
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;