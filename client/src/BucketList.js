import React, { useEffect ,useState } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Buckets from './components/Buckets/Buckets'; 
import FormBucket from './components/Form/FormBucket';
import { useDispatch } from 'react-redux';

import { getBuckets} from './actions/buckets';
import useStyles from './styles';



/* function FormRow() {
     const classes = useStyles();
     return (
       <React.Fragment>
         <Grid item xs={4}>
           <Paper className={classes.paper}>item</Paper>
         </Grid>
         <Grid item xs={4}>
           <Paper className={classes.paper}>item</Paper>
         </Grid>
         <Grid item xs={4}>
           <Paper className={classes.paper}>item</Paper>
         </Grid>
       </React.Fragment>
     );
   } */

const BucketList = () => {
    const [currentBucketId, setCurrentBucketId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

       useEffect(() => {                                                  
      dispatch(getBuckets());
    }, [currentBucketId,dispatch]);

    //const bucketsList = dispatch(getBuckets());


    return ( 
         <Container maxWidth="lg">
        <Grow in>
        <Container>
        <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
               <Grid item xs={12} sm={6}>
                    <Buckets currentBucketId={currentBucketId} setCurrentBucketId={setCurrentBucketId} />
                    {/*<FormRow />*/}
               </Grid>
               <Grid item xs={12} sm={4}>
                    <FormBucket currentBucketId={currentBucketId} setCurrentBucketId={setCurrentBucketId} />
               </Grid>
         </Grid>
         </Container>
         </Grow>
        </Container>
        );
}

export default BucketList;