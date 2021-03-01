export default (users = [], action) => {
    switch (action.type) {
        case 'DELETE_USER':
            return users.filter((user) => user._id !== action.payload);
        case 'UPDATE_USER': 
        return users.map((user) => user._id === action.payload._id ? action.payload : user);
        case 'FETCH_ALL_USERS':
            return action.payload;
        case 'CREATE_USER':
            return [ ...users, action.payload ];
        default:
            return users;
    }
}