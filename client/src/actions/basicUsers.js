import * as api from '../api';

export const getBasicUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.getBasicUser(id);
        
        dispatch( {type: 'FETCH', payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const updateBasicUser = (id, newUser) => async (dispatch) => {
    try {
        const { data } = await api.updateBasicUser(id, newUser);

        dispatch( {type: 'UPDATE', payload: data} );
    } catch (error) {
        console.log("Oh no something went wrong");
    }
}

