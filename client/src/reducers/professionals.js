import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/professionalsActionTypes';

export default (professional = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH:
            return action.payload;
        case UPDATE:
            return action.payload;
        case CREATE:
            return [ ...professional, action.payload ]
        case DELETE:
            return professional.filter((user) => user._id !== action.payload);
        default:
            return professional;
    }
}