
import React, { useEffect ,useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import NavbarProfessional from "../Navbar/NavbarProfessional";
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import useStyles from '../../styles';

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
  <NavbarProfessional updatedPosts={updatedPosts} setUpdatedPosts={setUpdatedPosts} setCurrentId={setCurrentId} currentId={currentId} />
  <Container maxWidth="lg">
    <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12}>
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
