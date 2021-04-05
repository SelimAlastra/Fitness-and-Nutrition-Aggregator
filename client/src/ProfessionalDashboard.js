
import React, { useEffect ,useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import NavbarProfessional from "./components/Navbar/NavbarProfessional";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ProfessionalNavbar from "./components/Navbar/ProfessionalNavbar";
import { useDispatch } from 'react-redux';
import { getPosts, updatePost } from './actions/posts';
import { getProfessionalUsers } from './actions/professionals';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { getProfessional } from './actions/professionals';

const ProfessionalDashboard = () => {
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
  <NavbarProfessional updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
  <Container maxWidth="lg">
    <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={5}>
              <Posts setCurrentId={setCurrentId} updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>

    </Container>
    </>
  );
}

export default ProfessionalDashboard;
