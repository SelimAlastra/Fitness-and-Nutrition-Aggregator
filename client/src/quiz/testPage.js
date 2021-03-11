import React from 'react';

import './styling/quizUser.css'

    const Test = (props) => {

        return (
            <>
            {props.questions.map((question) => 
                <li>{question.answerOptions.find(element => element.selected === true).answerText}</li>
            )}

            {props.questions[2].input.map((element) =>
                <div> input1: {props.questions[2].questionText}, answer: {element}, length: {props.questions[3].input.length}</div>
            )}

            {props.questions[3].input.map((element) =>
                <div> input2: {props.questions[3].questionText}, answer: {element}, length: {props.questions[3].input.length}</div>
            )}
            </>
        )
    }

export default Test;
