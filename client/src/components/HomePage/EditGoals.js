import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, updateGoal } from '../../actions/goals';
import { Grow, Grid} from '@material-ui/core';
import EditGoal from './EditGoal';
import { Form, Button, Col } from 'react-bootstrap';
import './EditGoals.css'
import NavbarUser from '../Navbar/NavbarUser';
import BasicUsers from '../UsersAuth/clientModal';
import Professional from '../UsersAuth/professionalModal';

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
        <NavbarUser/>
        <h2 className="EditGoalsText"> Goals Edition </h2>
        <Button type="button" variant="success" className="editGoalsButton" onClick={() => window.location.href = `/homePage/${userID}`}> Go back to home page</Button>
        <Grid container justify="center">
            {myGoals.map((goal) => (
                <Grid item xs= {4}>
                    <EditGoal key={goal._id} goal={goal}/>
                </Grid>           
            ))}
        </Grid>
        </div>
    );


}

export default EditGoals;