import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/basicUsersActionTypes';
import * as api from '../api';

export const getBasicUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.getBasicUser(id);
        
        dispatch( {type: FETCH, payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const updateBasicUser = (id, newUser) => async (dispatch) => {
    try {
        const { data } = await api.updateBasicUser(id, newUser);
        
        dispatch( {type: UPDATE, payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const getBasicUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBasicUsers();
        
        dispatch( {type: 'FETCH_ALL_USERS', payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const createBasicUser = (user) => async (dispatch) => {

    try {
        const { data } = await api.createBasicUser(user);

        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBasicUser = (id) => async (dispatch) => {

    try {
        await api.deleteBasicUser(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}