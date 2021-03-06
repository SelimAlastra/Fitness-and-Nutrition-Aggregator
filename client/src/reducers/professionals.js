export default (professional = {}, action) => {
    switch (action.type) {
        case 'FETCH':
            return action.payload;
        case 'UPDATE':
            return action.payload;
        default:
            return professional;
    }
}