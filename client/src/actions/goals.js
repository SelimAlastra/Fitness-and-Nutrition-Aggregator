import * as api from '../api';

export const getGoals = () => async (dispatch) => {
    try {
        const { data } = await api.getGoals();
        
        dispatch({type: 'FETCH_ALL_GOALS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getGoal = (id) => async (dispatch) => {
    try {
        const { data } = await api.getGoal(id);
        
        dispatch( {type: 'FETCH', payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const updateGoal = (id, newGoal) => async (dispatch) => {
    try {
        const { data } = await api.updateGoal(id, newGoal);

        dispatch( {type: 'UPDATE', payload: data} );
    } catch (error) {
        console.log("Oh no something went wrong");
    }
}

export const deleteGoal = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteGoal(id);

        dispatch({ type: 'DELETE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

