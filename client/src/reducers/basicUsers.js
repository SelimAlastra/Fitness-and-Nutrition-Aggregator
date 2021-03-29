export default (basicUsers = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_USERS':
            return action.payload;
        case 'FETCH_USER':
            return action.payload;
        case 'UPDATE_USER':
            return action.payload;
        case 'CREATE_USER':
            return [ ...basicUsers, action.payload ]
        case 'DELETE_USER':
            return basicUsers.filter((user) => user._id !== action.payload);
        default:
            return basicUsers;
    }
}