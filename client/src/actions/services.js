import * as api from "../api";

export const getServices = () => async (dispatch) => {
    try {
        const { data } = await api.getServices();
        dispatch({type: 'FETCH_ALL_SERVICES', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteService = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteService(id);

        dispatch({ type: 'DELETE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const addService = (service) => async (dispatch) => {
    try {
        const { data } = await api.addService(service);
        console.log(data);
        dispatch({ type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
} 

export const updateService = (id, updatedService) => async (dispatch) => {
    try {
        const { data } = await api.updateService(id, updatedService);
   
        dispatch({ type: 'UPDATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}