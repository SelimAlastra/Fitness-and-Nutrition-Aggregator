import React, { useEffect ,useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import NavbarUser from "./components/Navbar/NavbarUser";
import { getPosts, updatePost } from './actions/posts';
import Posts from './components/Posts/Posts';
import memories from './images/memories.png';
import useStyles from './styles';
//import {filteredPosts} from './components/SearchBar/SearchBar';

const ClientDashboard = () => {
    const [currentId, setCurrentId] = useState(null);
    const [updatedPosts,setUpdatedPosts]= useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPosts());
      setUpdatedPosts(updatedPosts);
    }, [currentId,dispatch,setUpdatedPosts]);
    
return (
  <>
  <NavbarUser updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
  <Container maxWidth="lg">
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className={classes.heading} variant="h2" align="center">Dashboard</Typography>
     <img className={classes.image} src={memories} alt="memories" height="60" />
    </AppBar>

    <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={6}>
            <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      
  </Container>
  </>
  );
}


export default ClientDashboard;
