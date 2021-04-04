import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/basicUsersActionTypes';

export default (basicUsers = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH:
            return action.payload;
        case UPDATE:
            return basicUsers.map((basicUsers) => basicUsers._id === action.payload._id ? action.payload : basicUsers);
        case CREATE:
            return [ ...basicUsers, action.payload ]
        case DELETE:
            return basicUsers.filter((user) => user._id !== action.payload);
        default:
            return basicUsers;
    }
}