import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getGoals } from "../../actions/goals";
import Goal from './Goal';
import './Goals.css';



const Goals = ({userID}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGoals());

    }, [dispatch]);

    const goals = useSelector((state) => state.goals);
    const myGoals = goals.filter(goal => goal.userID === userID);

    if (myGoals === undefined || myGoals.legnth === 0) {
        return (
            <div>
                <h2 className="goalsPageText"> You currently have no goals !</h2>
            </div>
        )
    } else {
        let goalsComponents = myGoals.map((goal, index) => {
            return (<Goal key={index} goal={goal}/>);
        });
        return (
            <div>
                <h2 className="goalsPageText">Goals</h2>
                <div className="goalsContainer">
                    {goalsComponents}
                </div>
            </div>
        );
    }

}

export default Goals;