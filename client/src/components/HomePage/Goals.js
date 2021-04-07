import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { addGoal, getGoals , deleteGoal} from "../../actions/goals";
import { Grow, Grid} from '@material-ui/core';
import {Container , Row} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
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

    function removeGoal(toDelete) {
        dispatch(deleteGoal(toDelete._id));
        window.location.href = `/homePage/${userID}`;
    }

    function generateGoals() {
    if (!myGoals.length) {
        return (
            <div>
                <h2 className="goalsPageText"> You currently have no goals !</h2>
                <h1 className="goalsPageText2" > You can add one by clicking the button above ! </h1>
            </div>
        )
    } else {
        return (
            <Grid container justify="center">
                {myGoals.map((goal) => (
                    <Grid item xs= {3}>
                    <Container>
                    <Goal key={goal._id} goal={goal}/>
                                <FontAwesomeIcon 
                                    icon={faTrashAlt}
                                    size= "lg"
                                    style={{ cursor:"pointer", color: "black"}}
                                    value={goal}
                                    onClick={() => removeGoal(goal)
                                    }
                                />
                    </Container>
                    </Grid>           
                ))}
            </Grid>
        );
    }
    }
    
    if(!myGoals.length){
    return (
            <div>
                <h2 className="goalsPageText"> Goals</h2>
                <Button className = "goalsButton" variant="outline-dark" onClick={() => setModalIsOpen(true)}> Add Goal </Button>
                <Modal className ='addGoalModal' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <div className ="closeDiv">
                <button className= "closeButtonGoal" onClick={() => setModalIsOpen(false)}>
                    <CloseIcon/>
                </button>
                </div>
                <div className ='center'>
                    <h2 className="goalsPageText3">Add goal</h2>
                    <AddGoal userID = {userID}/>
                    <Container className = 'center'>
                    </Container>
                </div>
                </Modal>
                <div className="goalsContainer">
                    {generateGoals()}
                </div>
            </div>
        );
    }
    else{
        return(
            <div className ="fullGoalsContainer">
            <h2 className="goalsPageText"> Goals</h2>
            <Button className = "goalsButton" variant="outline-success" onClick={() => setModalIsOpen(true)}> Add Goal </Button>
            <Button className = "goalsButton" variant="outline-success" onClick={() => window.location.href = `/homePage/edit/${userID}`}> Edit Goals </Button>
            <Modal className ='addGoalModal' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <div className ="closeDiv">
            <button className= "closeButtonGoal" onClick={() => setModalIsOpen(false)}>
                <CloseIcon/>
            </button>
            </div>
            <div className ='center'>
                <h2 className="goalsPageText3">Add goal</h2>
                <AddGoal userID = {userID}/>
                <Container className = 'center'>
                </Container>
            </div>
            </Modal>
            <div className="goalsContainer">
                {generateGoals()}
            </div>
            </div>
        )
    }
    }



export default Goals;