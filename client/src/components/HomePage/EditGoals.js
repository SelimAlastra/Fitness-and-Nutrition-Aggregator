import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, updateGoal } from '../../actions/goals';
import { Grow, Grid} from '@material-ui/core';
import EditGoal from './EditGoal';
import { Form, Button, Col } from 'react-bootstrap';
import './EditGoals.css'

const EditGoals = (props) => {

    const userID = props.match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGoals());
    }, [dispatch])

    const goals = useSelector((state) => state.goals);
    const myGoals = goals.filter(goal => goal.userID === userID);

    return (
        <div className = 'editGoalsDiv'>
        <Grid container>
            {myGoals.map((goal) => (
                <Grid item xs= {4}>
                    <EditGoal key={goal._id} goal={goal}/>
                </Grid>           
            ))}
        </Grid>
        <Button type="button" variant="outline-warning" className="goalEditButton" onClick={() => window.location.href = `/homePage/${userID}`}>Go to Home Page</Button>
        </div>
    );


}

export default EditGoals;