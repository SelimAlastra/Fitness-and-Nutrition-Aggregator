import { FETCH_ALL, CREATE, UPDATE, DELETE, ADD_TO_FAV, FETCH_FROM_ARRAY, FETCH } from '../constants/postsActionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_FROM_ARRAY:
            return action.payload
        case FETCH:
            return action.payload
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:   
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload; 
        case CREATE:
            return [ ...posts, action.payload];
        case ADD_TO_FAV:
            return posts;
        default:
            return posts;
    }
}