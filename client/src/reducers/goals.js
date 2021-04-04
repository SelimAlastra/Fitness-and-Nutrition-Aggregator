import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/goalsActionTypes.js';

export default (goals = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case DELETE:
            return goals.filter((goal) => goal._id !== action.payload);
        case UPDATE:
            return goals.map((goals) => goals._id === action.payload._id ? action.payload : goals);
        default:
            return goals;
    }
}