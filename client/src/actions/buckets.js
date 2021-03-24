import { FETCH_ALL_BUCKETS, CREATE_BUCKETS, UPDATE_BUCKET, FETCH_BUCKET } from '../constants/actionTypes';
import * as api from '../api/index';


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


  export const updateBucket = (id, bucket) => async (dispatch) => {
    try {
      const { data } = await api.updateBucket(id, bucket);
  
      dispatch({ type: UPDATE_BUCKET, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getBucket = (id) => async (dispatch) => {

    try {
        const { data } = await api.getBucket(id);
        
        dispatch( {type: FETCH_BUCKET, payload: data} );
        
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteBucket = (id) => async (dispatch) => {

  try {
      await api.deleteBucket(id);

      dispatch({ type: 'DELETE_BUCKET', payload: id });

  } catch (error) {
      console.log(error.message);
  }
}