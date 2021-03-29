import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/basicUsersActionTypes';

export default (basicUsers = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_USERS':
            return action.payload;
        case FETCH:
            return action.payload;
        case UPDATE:
            return action.payload;
        case CREATE:
            return [ ...basicUsers, action.payload ]
        case DELETE:
            return basicUsers.filter((user) => user._id !== action.payload);
        default:
            return basicUsers;
    }
}