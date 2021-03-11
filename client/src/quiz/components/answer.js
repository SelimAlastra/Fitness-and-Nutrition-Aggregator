import React, { useState } from 'react';
import '../styling/quizUser.css';
import Button from './ToggleButton';

const Answer = (props) => {

    const input = props.questions[props.currentQuestion].input;

    /**
     * validate input: ...
     */
    // function validate(){
    //     const pass_reg = /^[0-9]+ ?(\'|ft|cm|meters|feet|in|inches|\")?( *[1-9]+ ?(\"|inches|in|cm)?)?$/;
    //     const inputBox = document.querySelector('input');
    //     let value = inputBox.value;

    //     if(pass_reg.test(value)){
    //         inputBox.classList.add('valid');
    //         inputBox.classList.remove('invalid');
    //     } else {
    //         inputBox.classList.add('valid');
    //         inputBox.classList.remove('invalid');
    //     }
    // }

    /**
     * change input placeholder for question in a desired way
     */
    function customPlaceholder(i, options, questionId) {

        //for height input display the input value followed by the selected system 
        if(questionId === 3){
            if(i===1){
                if(input[0] === ""){
                    return "feet, inches";
                } else {
                    const feet = input[0].match(/\b(\w+)\b/g)[0];
                    const inches = input[0].match(/\b(\w+)\b/g)[1];
                    return feet + "'" + inches + '"';
                }
            } 
        }
            
        return input[0] + " " + options[i];
    }

    /**
     * display placeholder for questions that require input;
     * each selected value corresponds to a different placeholder and some even require further adjustments.
     */
    function placeholderValidation() {
        const questionId = props.questions[props.currentQuestion].questionId;
        const answers = props.answer;
        const options = props.questions[props.currentQuestion].placeholder;

        if(input.length === 0){
            for(let i=0; i<answers.length; i++){
                if(answers[i].selected === true){
                    return options[i];
                }
            }
        } else {
            for(let i=0; i<answers.length; i++){
                if(answers[i].selected === true){
                    return customPlaceholder(i, options, questionId);
                }
            }
        }
    }

    if(props.questionsReqInput.find(element => element === props.questions[props.currentQuestion].questionId)){
        
        return (
            <>
            <div>
                {props.answer.map((answerOption) => (
                    <Button 
                        key={answerOption.answerText} 
                        answerOption = {answerOption}
                        answerText = {answerOption.answerText}
                        handleAnswerButtonClick = {props.handleAnswerButtonClick} 
                        questions = {props.questions}
                    />
                ))}
            </div>

            <input className="inputBox" id="inputBox" type="text" name="name" placeholder={placeholderValidation()} key={"key_" + props.currentQuestion}/>
            </>
        );
    } else {
        return (
            // <button onClick={() => {props.handleAnswerButtonClick(answerOption)}}>{answerOption.answerText}</button>
            <div>
                {props.answer.map((answerOption) => (
                    <Button 
                        key={answerOption.answerText} 
                        answerOption = {answerOption}
                        answerText = {answerOption.answerText}
                        handleAnswerButtonClick = {props.handleAnswerButtonClick} 
                        questions = {props.questions}
                    />
                ))}
            </div>
        );
    }
    
}

export default Answer;