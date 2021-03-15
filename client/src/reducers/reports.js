export default (reports = [], action) => {
    switch (action.type) {
        case 'DELETE_ISSUE':
            return reports.filter((report) => report._id !== action.payload);
        case 'UPDATE_ISSUE': 
        return reports.map((report) => report._id === action.payload._id ? action.payload : report);
        case 'FETCH_ALL_ISSUES':
            return action.payload;
        case 'CREATE_ISSUE':
            return [ ...reports, action.payload ];
        default:
            return reports;
    }
}