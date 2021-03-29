import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/professionalsActionTypes';
import * as api from "../api";

export const getProfessional = (id) => async (dispatch) => {
    try {
        const { data } = await api.getProfessional(id);
   
        dispatch({type: FETCH, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateProfessional = (id, updatedProfile) => async (dispatch) => {
    try {
        const { data } = await api.updateProfessional(id, updatedProfile);
   
        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getProfessionalUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProfessionalUsers();
        
        dispatch( {type: FETCH_ALL, payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const createProfessionalUser = (user) => async (dispatch) => {
    

    try {
        const { data } = await api.createProfessionalUser(user);

        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProfessionalUser = (id) => async (dispatch) => {

    try {
        await api.deleteProfessionalUser(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}