
import React, { useEffect ,useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import NavbarProfessional from "./components/Navbar/NavbarProfessional";
import { useDispatch } from 'react-redux';
import SearchBar from './components/SearchBar/SearchBar';
import { getPosts, updatePost } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles';
import { useSelector } from 'react-redux';
//import {filteredPosts} from './components/SearchBar/SearchBar';

const ProfessionalDashboard = () => {
    const [currentId, setCurrentId] = useState(null);
    const [updatedPosts,setUpdatedPosts]= useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    /* const GetModifiedPosts= (filteredPosts) =>{
      console.log(filteredPosts);
      var newList=[];
      for(var j=0;j<filteredPosts.size;j++)
      for(var i=0;i<updatedPosts.size;i++)
         if(updatedPosts[i]._id == filteredPosts[j]._id)
           newList.push(filteredPosts[j]);
           console.log(newList);
        setUpdatedPosts(newList);
    } */
    useEffect(() => {
      dispatch(getPosts());
      //GetModifiedPosts(data);
      setUpdatedPosts(updatedPosts);
    }, [currentId,dispatch,setUpdatedPosts]);

    /*useEffect(() => {
      dispatch(getBuckets());
    }, [currentBucketId,dispatch]); */

return (
  <>
    <NavbarProfessional updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar} color="inherit">
        <Toolbar>
        <Typography className={classes.heading} variant="h2" align="center">Dashboard</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
        </Toolbar>
      </AppBar>
    </div>
       <SearchBar updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
       
    <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      
  </>
  );
}

export default ProfessionalDashboard;
