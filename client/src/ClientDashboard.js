import React, { useEffect ,useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import NavbarUser from "./components/Navbar/NavbarUser";
import { getPosts, updatePost } from './actions/posts';
import Posts from './components/Posts/Posts';
import memories from './images/memories.png';
import useStyles from './styles';
import { getProfessionalUsers } from './actions/professionals';
import { getBasicUsers ,getBasicUser, updateBasicUser } from './actions/basicUsers';
import {finalFilteredProfiles} from './components/Navbar/Searchbox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { getBuckets } from "./actions/buckets";
import { Link } from 'react-router-dom';
import "./App.css"

const ClientDashboard = () => {
    const [currentId, setCurrentId] = useState(null);
    const [updatedPosts,setUpdatedPosts]= useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPosts());
      dispatch(getProfessionalUsers());
      setUpdatedPosts(updatedPosts);
      dispatch(getBuckets());
    }, [dispatch]);

    // var showConstrained = false;

    const showProfiles = (event) => {
      var profiles = document.getElementById("profiles-full");
      var profilesMinimized = document.getElementById("profiles-minimized");

      var expandMore = document.getElementById("ExpandMoreIcon");
      var expandLess = document.getElementById("ExpandLessIcon");

      if(profiles.style.display === "block"){
        profiles.style.display = "none";
        expandLess.style.display = "none";
        profilesMinimized.style.display = "block";
        expandMore.style.display = "block";
      } else {
        profiles.style.display = "block";
        expandLess.style.display = "block";
        profilesMinimized.style.display = "none";
        expandMore.style.display = "none";
      }
    };

return (
  <>
  <NavbarUser updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
  <Container maxWidth="lg">
    {/* <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className={classes.heading} variant="h2" align="center">Dashboard</Typography>
     <img className={classes.image} src={memories} alt="memories" height="60" />
    </AppBar> */}

    { finalFilteredProfiles !== [] ? (
      finalFilteredProfiles.length < 6 ? (
        <div class="profile-search">
          {finalFilteredProfiles.map((profile) => (
            <button class="profile-button"  onClick={() => window.location.href = `/user/professional/profile/${profile._id}/${JSON.parse(localStorage.getItem('user'))._id}`}><AccountCircle/>{profile.username}</button>
          ))}
        </div>
        ) : (
          <>
          {/* view profiles in full */}
          <div id="profiles-full" class="profile-search-full">
            {finalFilteredProfiles.map((profile) => (
              <button class="profile-button" onClick={() => window.location.href = `/user/professional/profile/${profile._id}/${JSON.parse(localStorage.getItem('user'))._id}`}><AccountCircle/>{profile.username}</button>
            ))}
          </div>

          {/* view profiles minimized: only the first 6 profiles */}
          <div id="profiles-minimized" class="profile-search-minimized">
            {finalFilteredProfiles.slice(0, 6).map((profile) => (
              <button class="profile-button" onClick={() => window.location.href = `/user/professional/profile/${profile._id}/${JSON.parse(localStorage.getItem('user'))._id}`}><AccountCircle/>{profile.username}</button>
            ))}
          </div>

          <ExpandMoreIcon id="ExpandMoreIcon" onClick={showProfiles} class="profile-expand-button" />
          <ExpandLessIcon id="ExpandLessIcon" onClick={showProfiles} class="profile-expand-button" />
          </>
      )) : (<div></div>)
    }

    <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={6}>
            <Grid item xs={12} lg={12}>
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
