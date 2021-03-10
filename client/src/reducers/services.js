export default (services = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'DELETE':
            return services.filter((service) => service._id !== action.payload);
        case 'CREATE':
            return [...services, action.payload];
        default:
            return services;
    }
}