
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Container, CardHeader, } from '@material-ui/core/';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useState } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Bucket from '../../Buckets/Bucket/Bucket';
import Buckets from '../../Buckets/Buckets';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Videos from '../Videos/Videos';
import Buckets2 from "../../Buckets2/BucketModal";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ReportForm from "../../Reports/ReportForm"
import Modal from 'react-bootstrap/Modal';


import { deletePost, likePost, toggleFavAction } from '../../../actions/posts';


const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

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

  require('dotenv').config({ path: '/.env' });

  const [show, setShow] = useState(false);
  const handleCloseReport = () => setShow(false);
  const handleShowReport = () => setShow(true);


  const ReportPopUp = () => {
    const reportData = {
      reporterUsername: user.username,
      reportedUsername: post.creator,
      reason: '',
      postId: post._id
    }

    return (
      <>
        <MenuItem size="small" onClick={() => handleShowReport()}> Report </MenuItem>
        <Modal show={show} onHide={handleCloseReport}>
          <Modal.Header closeButton>
            <Modal.Title>Report</Modal.Title>
          </Modal.Header>
          <Modal.Body> <ReportForm reportData={reportData} /> </Modal.Body>
        </Modal>
      </>
    );
  }


  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?._id))
        ? (
          <><FavoriteIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><FavoriteBorderIcon fontSize="small" />&nbsp;{post.likes.length}</>
        );
    }

    return <><FavoriteBorderIcon fontSize="small" /></>;
  };

  const Delete = () => {
    console.log(post.userFrom);
    console.log(String(JSON.parse(localStorage.getItem('user'))._id));
    if (String(JSON.parse(localStorage.getItem('user'))._id) == post.userFrom) {
      return (<Button size="small" onClick={() => dispatch(deletePost(post._id))}>
        <DeleteIcon fontSize="small" />
        Delete
      </Button>)
    }
    return <div></div>
  }

  return (
    <Card className={classes.card}>
      <div className={classes.overlay}>
        <Typography style={{ "color": "black", "fontWeight": "bold" }}>{post.creator}</Typography>
        <Typography className={classes.time} style={{ "color": "black" }}>{moment(post.createdAt).fromNow()}</Typography>
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
          {JSON.parse(localStorage.getItem('user')).type == 'client' ?
            <ReportPopUp />
            :
            <MenuItem size="small" onClick={() => setCurrentId(post._id)}>Edit</MenuItem>
          }
        </Menu>
      </div>
      <Typography hidden={true} className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent hidden={true}>
        <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
      </CardContent>
      {   post.selectedFile ?
        <div className={classes.photo}>
          <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        </div>
        : <div></div>
      }

      <div className={classes.video}>
        {post.url ?
          <CardContent>
            <Videos setUrl={post.url} />
          </CardContent>
          : <div></div>
        }
      </div>

      { post.tags ?
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        : <> </>
      }
      <CardActions className={classes.cardActions}>
        <Container className={classes.buttons}>
          <div className={classes.button}>
            {post.likes ?
              <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id, JSON.parse(localStorage.getItem('user'))._id))}>
                <Likes />
              </Button>
              : <> </>
            }
          </div>
          {JSON.parse(localStorage.getItem('user')).type == 'client' ?
            <div className={classes.button}>
              <Buckets2 />
            </div>
            : <Delete />
          }
        </Container>
      </CardActions>
    </Card>
  );
}

export default Post;