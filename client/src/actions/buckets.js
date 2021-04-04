import { FETCH_ALL, CREATE, UPDATE, FETCH, DELETE } from '../constants/bucketsActionTypes';
import * as api from '../api/index';


// Action Creators

export const getBuckets = () => async (dispatch) => {
    try {
      const { data } = await api.getBuckets();
  
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const createBucket = (bucket) => async (dispatch) => {
    try {
      const { data } = await api.createBucket(bucket);
  
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };


  export const updateBucket = (id, bucket) => async (dispatch) => {
    try {
      const { data } = await api.updateBucket(id, bucket);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getBucket = (id) => async (dispatch) => {

    try {
        const { data } = await api.getBucket(id);
        
        dispatch( {type: FETCH, payload: data} );
        
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteBucket = (id) => async (dispatch) => {

  try {
      await api.deleteBucket(id);

      dispatch({ type: DELETE, payload: id });

  } catch (error) {
      console.log(error.message);
  }
};
