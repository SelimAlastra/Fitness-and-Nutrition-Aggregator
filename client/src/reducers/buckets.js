import { FETCH_ALL, CREATE, UPDATE, FETCH, DELETE } from '../constants/bucketsActionTypes';

export default (buckets = [],action) => {
    switch (action.type) {
        case FETCH:
            return action.payload;
        case FETCH_ALL:
            return action.payload; 
        case CREATE:
            return [ ...buckets, action.payload];
        case UPDATE:
            return buckets.map((bucket) => bucket._id === action.payload._id ? action.payload : bucket);
        case DELETE:
            return buckets.filter((bucket) => bucket._id !== action.payload);
        default:
            return buckets;
    }
}