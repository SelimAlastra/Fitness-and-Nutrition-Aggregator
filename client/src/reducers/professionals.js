export default (professional = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'FETCH':
            return action.payload;
        case 'UPDATE':
            return action.payload;
        case 'CREATE_USER':
            return [ ...professional, action.payload ]
        case 'DELETE_USER':
            return professional.filter((user) => user._id !== action.payload);
        default:
            return professional;
    }
}