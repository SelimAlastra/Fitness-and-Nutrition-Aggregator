import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/reportsActionTypes';

export default (reports = [], action) => {
    switch (action.type) {
        case FETCH:
            return action.payload
        case DELETE:
            return reports.filter((report) => report._id !== action.payload);
        case UPDATE: 
            return reports.map((report) => report._id === action.payload._id ? action.payload : report);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [ ...reports, action.payload ];
        default:
            return reports;
    }
}