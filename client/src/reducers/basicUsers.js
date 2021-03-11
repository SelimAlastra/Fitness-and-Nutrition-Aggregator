export default (basicUsers = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'FETCH':
            return action.payload;
        case 'UPDATE':
            return action.payload;
        case 'CREATE_USER':
            return [ ...basicUsers, action.payload ]
        case 'DELETE_USER':
            return basicUsers.filter((user) => user._id !== action.payload);
        default:
            return basicUsers;
    }
}