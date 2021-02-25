export default (users = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'UPDATE': 
            return users.map((user) => user._id === action.payload._id ? action.payload : user);
        case 'CREATE':
            return [ ...users, action.payload ];
        default:
            return users;
    }
}