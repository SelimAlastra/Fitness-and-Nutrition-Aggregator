import * as api from "../api";

export const getProfessional = (id) => async (dispatch) => {
    try {
        const { data } = await api.getProfessional(id);
        dispatch({type: 'FETCH', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}