import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/servicesActionTypes';

export default (services = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case DELETE:
            return services.filter((service) => service._id !== action.payload);
        case CREATE:
            return [...services, action.payload];
        case UPDATE:
            return services.map((services) => services._id === action.payload._id ? action.payload : services);
        default:
            return services;
    }
}