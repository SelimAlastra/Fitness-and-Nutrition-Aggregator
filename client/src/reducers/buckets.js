import { FETCH_ALL_BUCKETS, CREATE_BUCKETS, UPDATE_BUCKET, FETCH_BUCKET } from '../constants/actionTypes';

export default (buckets = [],action) => {
    switch (action.type) {
        case FETCH_BUCKET:
            return action.payload;
        case FETCH_ALL_BUCKETS:
            return action.payload; 
        case CREATE_BUCKETS:
            return [ ...buckets, action.payload];
        case UPDATE_BUCKET:
            return action.payload;
        case 'DELETE_BUCKET':
            return buckets.filter((bucket) => bucket._id !== action.payload);
        default:
            return buckets;
    }
}