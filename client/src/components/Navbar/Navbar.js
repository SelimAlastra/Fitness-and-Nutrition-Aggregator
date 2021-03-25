import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../actions/userAuth.js';
/* import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes'; */
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
 /*  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]); */

  return (
   /*  <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div> */
      <Toolbar className={classes.toolbar}>
        {/* {user?.result ? ( */}
          <div>
            {/* <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> */}
            <Button variant="contained"  color="secondary" onClick={() => { signOut(() => {
                history.push('/');
                });}}>
            Logout
            </Button>
          </div>
          <Button  
            variant="contained" 
            color="primary"
            onClick={
              () => window.location.href = `/clientDashboard/${JSON.parse(localStorage.getItem('user'))._id}`
            }
          >
            Dashboard
          </Button>
          <Button 
            component={Link} 
            to={'/buckets'} 
            variant="contained" 
            color="primary"
          >
            My Buckets
          </Button>
          <Button 
            component={Link} 
            to={`/user/myservices/${JSON.parse(localStorage.getItem('user'))._id}`} 
            variant="contained" 
            color="primary"
          >
            My Bundles
          </Button>
          <Button
            component={Link}
            to={`/user/profile/${JSON.parse(localStorage.getItem('user'))._id}`}
            variant="contained" 
            color="primary"
          >
            My Profile
          </Button>
          <Button
            component={Link}
            to={`/user/edit/${JSON.parse(localStorage.getItem('user'))._id}`}
            variant="contained" 
            color="primary"
          >
            Edit My Details
          </Button>
        {/* )} */}
      </Toolbar>
    // </AppBar>
  );
};

export default Navbar;