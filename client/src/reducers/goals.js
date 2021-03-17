export default (goals = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;

        case 'DELETE':
                return goals.filter((goal) => goal._id !== action.payload);

        case 'UPDATE':
            return action.payload;
        default:
            return goals;
    }
}