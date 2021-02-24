import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Bucket from './Bucket/Bucket';
import useStyles from './styles';

const Buckets = ({setCurrentBucketId}) => {

    const buckets = useSelector((state) => state.buckets);
    const classes = useStyles();

    console.log(buckets);

    return (
        !buckets.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
                {buckets.map((bucket) => (
                       <Grid key={bucket._id} item xs={12} sm={6}>
                            <Bucket bucket={bucket} setCurrentBucketId={setCurrentBucketId} />
                       </Grid> 
                ))}
            </Grid>
        )
    );
}

export default Buckets;