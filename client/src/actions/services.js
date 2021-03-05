import * as api from "../api";

export const getServices = () => async (dispatch) => {
    try {
        const { data } = await api.getServices();
        console.log(data);
        
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}