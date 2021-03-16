import * as api from '../api';

export const getReports = () => async (dispatch) => {

    try {
        const { data } = await api.fetchReports();

        dispatch({ type: 'FETCH_ALL_REPORTS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createReport = (Report) => async (dispatch) => {

    try {
        const { data } = await api.createReport(Report);

        dispatch({ type: 'CREATE_REPORT', payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteReport = (id) => async (dispatch) => {

    try {
        await api.deleteReport(id);

        dispatch({ type: 'DELETE_REPORT', payload: id });

    } catch (error) {
        console.log(error.message);
    }
}

export const getReport = (id) => async (dispatch) => {
    try {
        const { data } = await api.getReport(id);
        
        dispatch( {type: 'FETCH', payload: data} );
    } catch (error) {
        console.log(error.message);
    }
};