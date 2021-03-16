import { FETCH_ALL_BUCKETS, CREATE_BUCKETS } from '../constants/actionTypes';
import * as api from '../api/buckets';


// Action Creators

export const getBuckets = () => async (dispatch) => {
    try {
      const { data } = await api.fetchBuckets();
  
      dispatch({ type: FETCH_ALL_BUCKETS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const createBucket = (bucket) => async (dispatch) => {
    try {
      const { data } = await api.createBucket(bucket);
  
      dispatch({ type: CREATE_BUCKETS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };