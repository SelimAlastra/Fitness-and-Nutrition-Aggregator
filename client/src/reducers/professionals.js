import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/professionalsActionTypes';

export default (professional = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH:
            return action.payload;
        case UPDATE:
            return professional.map((professional) => professional._id === action.payload._id ? action.payload : professional);
        case CREATE:
            return [ ...professional, action.payload ]
        case DELETE:
            return professional.filter((user) => user._id !== action.payload);
        default:
            return professional;
    }
}