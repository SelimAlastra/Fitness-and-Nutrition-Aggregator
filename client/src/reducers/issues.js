export default (issues = [], action) => {
    switch (action.type) {
        case 'DELETE_ISSUE':
            return issues.filter((issue) => issue._id !== action.payload);
        case 'UPDATE_ISSUE': 
        return issues.map((issue) => issue._id === action.payload._id ? action.payload : issue);
        case 'FETCH_ALL_ISSUES':
            return action.payload;
        case 'CREATE_ISSUE':
            return [ ...issues, action.payload ];
        default:
            return issues;
    }
}