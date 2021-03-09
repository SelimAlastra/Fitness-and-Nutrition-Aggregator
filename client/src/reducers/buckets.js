import { FETCH_ALL_BUCKETS, CREATE_BUCKETS, UPDATE_BUCKET } from '../constants/actionTypes';

export default (buckets = [],action) => {
    switch (action.type) {
        case FETCH_ALL_BUCKETS:
            return action.payload; 
        case CREATE_BUCKETS:
            return [ ...buckets, action.payload];
        case UPDATE_BUCKET:
            return buckets.map((bucket) => bucket._id === action.payload._id ? action.payload : bucket);
        default:
            return buckets;
    }
}