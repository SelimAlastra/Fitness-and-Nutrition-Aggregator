import React, { useState } from 'react';
import '../styling/quizUser.css';
import Button from './ToggleButton';

const Answer = (props) => {

    let input = props.questions[props.currentQuestion].input;
    
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

        if(questionId === 3){
            //for metric value selected, allow only number inputs
            if(answers[0].selected === true){
                if(digits.search(query.charAt(query.length-1)) > -1){
                    return checkZero();
                } else {
                    alert(props.questions[props.currentQuestion].alert[0]);
                    return false;
                }
            //for imperial value selected, allow " " and ","
            } else {
                if((digits + ", ").search(query.charAt(query.length-1)) > -1){
                    if("0".search(query[0]) > -1){
                        alert(props.questions[props.currentQuestion].alert[2]);
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    alert(props.questions[props.currentQuestion].alert[1]);
                    return false;
                }

            }
        } else if(questionId === 4){
            if(digits.search(query.charAt(query.length-1)) > -1){
                return checkZero();
            } else {
                if(answers[0].selected === true){
                    alert(props.questions[props.currentQuestion].alert[0]);
                } else {
                    alert(props.questions[props.currentQuestion].alert[1]);
                }
                return false;
            }
        } else if(questionId === 5 || questionId === 7 || questionId === 8 || questionId === 9 || questionId === 11){
            if((letters+digits+" ,.?!';").search(query.charAt(query.length-1)) > -1){
                return true;
            }
            return false;
        } /*else if(){
            
        }*/
    }

    /**
     * check validation for every character input
     */
    function handleOnInputChange(event) {
        const query = event.target.value;
        if(query !== ""){
            if (validateInput(query)===true){
                input = query;
                console.log(input);
            } else {
                document.getElementById("inputBox").value=input;
                console.log(input);
            } 
        }
    };

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

    /**
     * check if question requires input unrelated to selected answer
     */
    if(props.questionsReqInput.find(element => element === props.questions[props.currentQuestion].questionId)){
        
        //display answers followed by input box
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
            <input className="inputBox" id="inputBox" type="text" name="name" placeholder={placeholderValidation()} key={"key_" + props.currentQuestion} onChange={handleOnInputChange}/>
            </>
        );
    } else {

        //display answers and check for specific selections that require further input
        return (
            <>
            <div>
                {props.answer.map((answerOption) => (
                <>
                    <Button 
                        key={answerOption.answerText} 
                        answerOption = {answerOption}
                        answerText = {answerOption.answerText}
                        handleAnswerButtonClick = {props.handleAnswerButtonClick} 
                        questions = {props.questions}
                    />
                    <input style = {{ display: answerOption.requireInput ? 'block' : 'none'}} className="inputBox" id="inputBox" type="text" name="name" placeholder={answerOption.placeholder} key={"key_" + props.currentQuestion} onChange={handleOnInputChange}/>
                </>
                ))}
            </div>
            </>
        );
    }
}

export default Answer;