import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/reportsActionTypes';
import * as api from '../api';

export const getReports = () => async (dispatch) => {

    try {
        const { data } = await api.fetchReports();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createReport = (Report) => async (dispatch) => {

    try {
        const { data } = await api.createReport(Report);

        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteReport = (id) => async (dispatch) => {

    try {
        await api.deleteReport(id);

        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error.message);
    }
}

export const getReport = (id) => async (dispatch) => {

    try {
        const { data } = await api.getReport(id);
        
        dispatch( {type: FETCH, payload: data} );
        
    } catch (error) {
        console.log(error.message);
    }
};