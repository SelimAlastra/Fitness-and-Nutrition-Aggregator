import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getGoals , deleteGoal} from "../../actions/goals";
import { Container , Row } from 'react-bootstrap';
import Goal from './Goal';
import './Goals.css';



const Goals = ({userID}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGoals());

    }, [dispatch]);

    const goals = useSelector((state) => state.goals);
    const myGoals = goals.filter(goal => goal.userID === userID);

    function removeGoal(toDelete) {
        dispatch(deleteGoal(toDelete._id));
        myGoals.filter(goal => goal === toDelete);
        window.location.href = `/homePage/${userID}`;
    }

    if (myGoals === undefined || myGoals.legnth === 0) {
        return (
            <div>
                <h2 className="goalsPageText"> You currently have no goals !</h2>
            </div>
        )
    } else {
        let goalsComponents = myGoals.map((goal, index) => {
            return (
                
            <Container>
            <tr key={index}>
                <Row>
                <Goal key={index} goal={goal}/>
                </Row>
                <Row className="justify-content-md-center">

                        <div>
                            <FontAwesomeIcon 
                                icon={faTrashAlt}
                                style={{ cursor:"pointer", color: "white"}}
                                value={goal}
                                 onClick={() => removeGoal(goal)}
                            />
                        </div>

                </Row>
            </tr>
            </Container>

                );
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