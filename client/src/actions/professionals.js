import * as api from "../api";

export const getProfessional = (id) => async (dispatch) => {
    try {
        const { data } = await api.getProfessional(id);
   
        dispatch({type: 'FETCH_PROFESSIONAL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateProfessional = (id, updatedProfile) => async (dispatch) => {
    try {
        const { data } = await api.updateProfessional(id, updatedProfile);
   
        dispatch({ type: 'UPDATE_PROFESSIONAL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getProfessionalUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProfessionalUsers();
        
        dispatch( {type: 'FETCH_ALL', payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const createProfessionalUser = (user) => async (dispatch) => {
    

    try {
        const { data } = await api.createProfessionalUser(user);

        dispatch({ type: 'CREATE_USER', payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProfessionalUser = (id) => async (dispatch) => {

    try {
        await api.deleteProfessionalUser(id);

        dispatch({ type: 'DELETE_USER', payload: id });
    } catch (error) {
        console.log(error.message);
    }
}