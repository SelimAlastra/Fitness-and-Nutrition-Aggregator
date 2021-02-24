import React, { useState , useEffect} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useDispatch} from 'react-redux';
import useStyles from './styles';

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";



//import { deletePost, likePost, toggleFavAction } from '../../../actions/posts';
// removePost
const Bucket = ({ bucket , setCurrentBucketId }) => {
    const classes = useStyles();
    const dispatch =useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
    return (
        <Card className={classes.card}> 
            <div className={classes.overlay}>
                <Typography variant="h6">{bucket.title}</Typography>
            </div>
            {/*<div className={classes.overlay2}> 
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
            </div> */}
            
            {/* <CardActions className={classes.cardActions}> 
                <Button size="small" color="primary" onClick={() => dispatch(deleteBucket(bucket._id))}>
                    <DeleteIcon fontSize="small" /> 
                    Delete                   
                </Button>
            </CardActions> */}
        </Card>
    );
}

export default Bucket;