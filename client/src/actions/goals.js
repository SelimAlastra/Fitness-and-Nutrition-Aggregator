import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH } from '../constants/goalsActionTypes';
import * as api from '../api';


export const createGoal = (goal) => async (dispatch) => {
    try {
      const { data } = await api.createGoal(goal);
  
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const getGoals = () => async (dispatch) => {
    try {
        const { data } = await api.getGoals();
        
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getGoal = (id) => async (dispatch) => {
    try {
        const { data } = await api.getGoal(id);
        
        dispatch( {type: FETCH, payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const updateGoal = (id, newGoal) => async (dispatch) => {
    try {
        const { data } = await api.updateGoal(id, newGoal);

        dispatch( {type: UPDATE, payload: data} );
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteGoal = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteGoal(id);

        dispatch({ type: DELETE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

