import React from 'react';
import '../styling/quizUser.css';

const Question = (props) => {
    return(
        <h1>{props.currentQuestion + 1}/{props.questionsLength} {props.question.questionText}</h1>
    );
}

export default Question;