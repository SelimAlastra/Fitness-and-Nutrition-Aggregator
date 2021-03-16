export default (reports = [], action) => {
    switch (action.type) {
        case 'FETCH_REPORT':
            return action.payload
        case 'DELETE_REPORT':
            return reports.filter((report) => report._id !== action.payload);
        case 'UPDATE_REPORT': 
        return reports.map((report) => report._id === action.payload._id ? action.payload : report);
        case 'FETCH_ALL_REPORTS':
            return action.payload;
        case 'CREATE_REPORT':
            return [ ...reports, action.payload ];
        default:
            return reports;
    }
}