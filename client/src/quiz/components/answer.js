import React, { useState } from 'react';
import '../styling/quizUser.css';
import Button from './ToggleButton';
import DobPicker from './dobPicker';

const Answer = (props) => {

    let input = props.questions[props.currentQuestion].input;
    
    // depending on user input, @return true or false if value is valid
    function validateInput(query) {
        const questionId = props.questions[props.currentQuestion].questionId;
        const answers = props.questions[props.currentQuestion].answerOptions;
        const digits = "0123456789";
        const letters = "abcdefghijklmnopqrstuvwxyz";

        /**
         * @return true if input does not start with 0, false otherwise
         * if @false, clear input value
         */
        function checkZero() {
            if("0".search(query[0]) > -1){
                alert("Value can't start with '0'.");
                return false;
            } else {
                return true;
            }
        }

        // validate depending on client/professional user
        if(props.isClient === true){
            if(questionId === 4){
                if(digits.search(query.charAt(query.length-1)) > -1){
                    if(query != ""){
                        return checkZero();
                    }
                    return true;
                } else {
                    if(answers[0].selected === true){
                        alert(props.questions[props.currentQuestion].alert[0]);
                    } else {
                        alert(props.questions[props.currentQuestion].alert[1]);
                    }
                    return false;
                }
            } else if(questionId === 5 || questionId === 7){
                if((letters+digits+" ,.?!';").search(query.charAt(query.length-1)) > -1){
                    return true;
                }
                return false;
            } else if(questionId === 10){
                if((letters+digits+" #,.';").search(query.charAt(query.length-1)) > -1){
                    return true;
                }
                return false;
            }/*else if(){
            }*/

        } else {
            if(questionId === 6){
                if((letters+digits+" #,.?!';").search(query.charAt(query.length-1)) > -1){
                    return true;
                }
                return false;
            }/*else if(){
            }*/
        }
    }

    /**
     * store an answer's input value 
     */
    function addIndividualInput (answer, input) {
        if(!answer.input || !answer.input.length){
            answer.input.push(input);
        } else {
            answer.input.pop();
            answer.input.push(input);
        }
    }

    /**
     * auto-select input answer 
     */
    const autoSelect = (answerOption) => {
        if(answerOption){
            answerOption.selected = true;
            props.refresh(props.questions);
        }
    }

    /**
     * check validation for every character input
     */
    function handleOnInputChange(event, answerOption) {
        const query = event.target.value;
        
        if (validateInput(query)===true){
            input = query;
            autoSelect(answerOption);
            if(answerOption){
                if(answerOption.requireInput === true){
                    addIndividualInput(answerOption, input);
                }
            }
        } else {
            document.getElementById("inputBox").value=input;
        } 
    };

    /**
     * change input placeholder for question in a desired way
     * (no special placeholders for now)
     */
    function customPlaceholder(i, options, questionId) {
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

    /**
     * @return input value for individual answer input boxes
     */
    function inputValue(answer) {
        if(answer.requireInput === true){
            if(answer.input){
                return answer.input[0];
            }
        }
        return ""
    }

    /**
     * check if question requires input unrelated to selected answer
     */
    if(props.questionsReqInput.find(element => element === props.questions[props.currentQuestion].questionId)){
        
        //display answers followed by input box
        return (
            <>

            <div className="quizBtn">
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
            <input className="inputBox" id="inputBox" type="text" name="name" placeholder={placeholderValidation()} key={"key_" + props.currentQuestion} onChange={e => handleOnInputChange(e)}/>
            </>
        );
    } else {

        //display answers and check for specific selections that require further input
        return (
            <>
            { props.questions[props.currentQuestion].questionId === 2 && props.isClient ? (
                    <div>
                        <DobPicker />
                    </div>
                ) : ( 
            <div>
                {props.answer.map((answerOption) => (
                <div className="quizBtn">
                    <Button 
                        key={answerOption.answerText} 
                        answerOption = {answerOption}
                        answerText = {answerOption.answerText}
                        handleAnswerButtonClick = {props.handleAnswerButtonClick} 
                        questions = {props.questions}
                    />
                    <input value={inputValue(answerOption)} style = {{ display: answerOption.requireInput ? 'block' : 'none'}} className="inputBox" id="inputBox" type="text" name="name" placeholder={answerOption.placeholder} key={"key_" + props.currentQuestion} onChange={e => handleOnInputChange(e, answerOption)}/>
                </div>
                ))}
            </div>
                )}
            </>
        );
    }
}

export default Answer;