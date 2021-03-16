export default (professional = {}, action) => {
    switch (action.type) {
        case 'FETCH':
            return action.payload;
        case 'UPDATE_PROFESSIONAL':
            return action.payload;
        default:
            return professional;
    }
}