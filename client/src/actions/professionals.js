import * as api from "../api";

export const getProfessional = (id) => async (dispatch) => {
    try {
        const { data } = await api.getProfessional(id);
   
        dispatch({type: 'FETCH', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateProfessional = (id, updatedProfile) => async (dispatch) => {
    try {
        const { data } = await api.updateProfessional(id, updatedProfile);
   
        dispatch({ type: 'UPDATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}