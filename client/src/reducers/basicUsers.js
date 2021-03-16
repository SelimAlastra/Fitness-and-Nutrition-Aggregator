export default (basicUsers = {}, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return action.payload;
        case 'UPDATE_USER':
            return action.payload;
        default:
            return basicUsers;
    }
}