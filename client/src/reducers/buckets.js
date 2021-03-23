import { FETCH_ALL_BUCKETS, CREATE_BUCKETS } from '../constants/actionTypes';

export default (buckets = [],action) => {
    switch (action.type) {
        case FETCH_ALL_BUCKETS:
            return action.payload; 
        case CREATE_BUCKETS:
            return [ ...buckets, action.payload];
        default:
            return buckets;
    }
}