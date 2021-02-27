import React, { useEffect ,useState } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import Buckets from './components/Buckets/Buckets'; 
import FormBucket from './components/Form/FormBucket';
import { useDispatch } from 'react-redux';

import { getBuckets} from './actions/buckets';
import useStyles from './styles';
const BucketList = () => {
    const [currentBucketId, setCurrentBucketId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

       useEffect(() => {
      dispatch(getBuckets());
    }, [currentBucketId,dispatch]);

    return ( 
         <Container maxWidth="lg">
        <Grow in>
        <Container>
         <Grid item xs={12} sm={4}>
              <FormBucket currentBucketId={currentBucketId} setCurrentBucketId={setCurrentBucketId} />
         </Grid>
         <Grid item xs={12} sm={4}>
         <Buckets currentBucketId={currentBucketId} setCurrentBucketId={setCurrentBucketId} />
         </Grid>
         </Container>
         </Grow>
        </Container>
        );
}

export default BucketList;