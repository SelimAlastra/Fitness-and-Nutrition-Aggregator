export default (issues = [], action) => {
    switch (action.type) {
        case 'DELETE':
            return issues.filter((issue) => issue._id !== action.payload);
        case 'UPDATE': 
        return issues.map((issue) => issue._id === action.payload._id ? action.payload : issue);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [ ...issues, action.payload ];
        default:
            return issues;
    }
}