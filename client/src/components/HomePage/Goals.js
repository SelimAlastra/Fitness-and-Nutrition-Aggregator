import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addGoal, getGoals , deleteGoal} from "../../actions/goals";
import { Grow, Grid} from '@material-ui/core';
import {Container , Row} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Goal from './Goal';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import AddGoal from './AddGoal'
import './Goals.css';
import 'reactjs-popup/dist/index.css';




const Goals = ({userID}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGoals());
    }, [dispatch])

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const goals = useSelector((state) => state.goals);
    const myGoals = goals.filter(goal => goal.userID === userID);

    console.log(myGoals);

    function removeGoal(toDelete) {
        dispatch(deleteGoal(toDelete._id));
        myGoals.filter(goal => goal === toDelete);
        window.location.href = `/homePage/${userID}`;
    }

    function generateGoals() {
    if (myGoals === undefined || myGoals.legnth === 0) {
        return (
            <div>
                <h2 className="goalsPageText"> You currently have no goals !</h2>
            </div>
        )
    } else {
        return (
            <Grid container justify="center">
                {myGoals.map((goal) => (
                    <Grid item xs= {3}>
                    <Goal key={goal._id} goal={goal}/>
                                <FontAwesomeIcon 
                                    icon={faTrashAlt}
                                    style={{ cursor:"pointer", color: "white"}}
                                    value={goal}
                                    onClick={() => removeGoal(goal)}
                                />

                    </Grid>           
                ))}
            </Grid>
        );
    }
    }
    return (
            <div>
                <h2 className="goalsPageText"> Goals</h2>
                <Button className = "goalsButton" variant="outline-warning" onClick={() => window.location.href = `/homePage/edit/${userID}`}> Edit Goals </Button>
                <Button className = "goalsButton" variant="outline-warning" onClick={() => setModalIsOpen(true)}> Add Goal </Button>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <div className ='center'>
                    <h2>Add goal</h2>
                    <AddGoal userID = {userID}/>
                    <Container className = 'center'>
                    <Button className = "goalsButton" variant="outline-warning" onClick={() => window.location.href = `/homePage/${userID}`}> Close </Button>
                    </Container>
                </div>
                </Modal>
                <div className="goalsContainer">
                    {generateGoals()}
                </div>
                
            </div>
        );
    }



export default Goals;