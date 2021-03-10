import * as api from '../api';

export const getIssues = () => async (dispatch) => {

    try {
        const { data } = await api.fetchIssues();

        dispatch({ type: 'FETCH_ALL_ISSUES', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createIssue = (Issue) => async (dispatch) => {

    try {
        const { data } = await api.createIssue(Issue);

        dispatch({ type: 'CREATE_ISSUE', payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteIssue = (id) => async (dispatch) => {

    try {
        await api.deleteIssue(id);

        dispatch({ type: 'DELETE_ISSUE', payload: id });

    } catch (error) {
        console.log(error.message);
    }
}