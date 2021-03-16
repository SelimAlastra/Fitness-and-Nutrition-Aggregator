import React, { Component } from 'react';
import Question from './components/question';
import Answer from './components/answer';
import Test from './testPage';
import './styling/quizUser.css'

export default class Quiz extends Component{

    state = {
        questions: [
            {
                questionText: "Are you a woman or a man?",
                questionId: 1,
                answerOptions: [
                    { answerText: "Woman", selected:false },
                    { answerText: "Man", selected:false },
                ],
            },{
                questionText: "How many years have you been a personal trainer for",
                questionId: 2,
                answerOptions: [
                    { answerText: "1-3 years", selected:false },
                    { answerText: "3-5 years", selected:false },
                    { answerText: "5-10 years", selected:false },
                    { answerText: "10+", selected:false },
                ],
            },{
                questionText: "What is your primary niche?",
                questionId: 3,
                answerOptions: [
                    { answerText: "Yoga, pilates", selected:false },
                    { answerText: "Cardio and weight loss", selected:false },
                    { answerText: "Weight training and strength focused", selected:false },
                    { answerText: "All-around and complex", selected:false },
                ],
            },{
                questionText: "Do you offer diet advice?",
                questionId: 4,
                answerOptions: [
                    { answerText: "Yes", selected:false },
                    { answerText: "No", selected:false },
                ],
            },{
                questionText: "Do you preffer online/in person sessions?",
                questionId: 5,
                answerOptions: [
                    { answerText: "Online", selected:false },
                    { answerText: "In person", selected:false },
                ],
            },{
                questionText: "Select some popular tags associated with your ",
                questionId: 6,
                answerOptions: [
                    { answerText: "crossfit", selected:false },
                    { answerText: "muscle", selected:false },
                    { answerText: " ", selected:false },
                    { answerText: " ", selected:false },
                    /** e.g.: #aerobic, #plyometric  */
                ],
            },
        ],
    
        questionsReqInput: [6], //these are questions that require input
    
        currentQuestion: 0,
        complete: false,
        invalidInput: false
    }

    /**
     * @param answer is the selected answer
     * if there are other selected answers, mark them as not selected
     * update @questions-information with the new selected answer
     * move to the next question
     * 
     * (this function violates the Single-Responsability-Principle..)
     */
    handleAnswerButtonClick = (answer) => {
        const{questions, currentQuestion, questionsReqInput} = this.state;
        const newItems = [...questions];

        // used to determine whether the next question will be automatically displayed or not (Yes if @true, No if @false)
        let firstTimeSelected = true;

        // remove previously selected answer
        if(newItems[currentQuestion].answerOptions.find(element => element.selected === true)){
            const answerSelected = newItems[currentQuestion].answerOptions.find(element => element.selected === true);
            answerSelected.selected = false; 
            firstTimeSelected = false;

            // if question required input, clear saved input
            if(questionsReqInput.find(element => element === newItems[currentQuestion].questionId)){
                newItems[currentQuestion].input.pop();
            }
        }

        // set new selected answer 
        if(newItems[currentQuestion].answerOptions.find(element => element === answer)){
            const answerToSelect = newItems[currentQuestion].answerOptions.find(element => element === answer);
            answerToSelect.selected = true;
        }

        //update the @questions values
        this.setState({
            questions : newItems
        })

        if(currentQuestion + 1 < questions.length){
            if(firstTimeSelected === true && !questionsReqInput.find(element => element === questions[currentQuestion].questionId)){
                this.setState({
                    currentQuestion: currentQuestion+1,
                    answerToSelect : true
                });
            } else {
                this.setState({
                    answerToSelect : true
                });
            }
        }
    }

    /**
     * check if @param value is an integer
     */
    isInt = (value) => {
        return !isNaN(value) && 
               parseInt(Number(value)) == value && 
               !isNaN(parseInt(value, 10));
      }

    /**
     * @return index of selected answer
     */
    findSelectedAnswer = () => {
        const{questions, currentQuestion} = this.state;

        for(let i=0; i<questions[currentQuestion].answerOptions.length; i++){
            if(questions[currentQuestion].answerOptions[i].selected === true){
                return i;
            }
        }
    }

    /**
     * @param input is the value that seeks approval to be saved as user input
     */
    addInput = (input) => {
        const{questions, currentQuestion} = this.state;
        questions[currentQuestion].input.push(document.getElementById("inputBox").value);
    /*
        //for height question accept two types of input depending on selected value
        if(questions[currentQuestion].questionId === 3){
            if(this.findSelectedAnswer() === 0){
                if(this.isInt(input)){
                    //ERROR display still in progress
                    //document.getElementById("inputAlert").classList.add("disabled");

                    questions[currentQuestion].input.push(document.getElementById("inputBox").value);
                } else {
                    alert("ERROR! Input is invalid.");
                    //ERROR display still in progress
                    //document.getElementById("inputAlert").classList.remove("disabled");
                }
            } else {
                if(input!=""){
                    //const feet = input.replace("feet","")[0].match(/\b(\w+)\b/g)[0];
                    //const inches = input.replace("inches","")[0].match(/\b(\w+)\b/g)[1];
                    if(this.isInt(feet)){
                        if(inches === ""){
                            questions[currentQuestion].input.push(feet);
                        } else {
                            if(this.isInt(inches)){
                                questions[currentQuestion].input.push(feet + " " + inches);
                            } else{
                                alert("ERROR! Input is invalid.");
                            }
                        }
                    } else {
                        alert("ERROR! Input is invalid.");
                    }
                }
            }
        } */
    }

    /**
     * if question requires input, add input value 
     * if there is already an input value, pop it and add new value
     */
    processInput = () => {
        const{questions, currentQuestion, questionsReqInput} = this.state;

        //check for question that requires input
        if(questionsReqInput.find(element => element === questions[currentQuestion].questionId)){

            //check if there has been previous input value
            if(!questions[currentQuestion].input || !questions[currentQuestion].input.length){
                this.addInput(document.getElementById("inputBox").value);
            } else {
                //save new input if value is not null
                if(document.getElementById("inputBox").value.length > 0){
                    questions[currentQuestion].input.pop();
                    this.addInput(document.getElementById("inputBox").value);
                }
            }
        }
    }

    /**
     * move to the previous question, only if there are previos questions
     */
    handleBackButtonClick = () => {
        const{currentQuestion} = this.state
        if(currentQuestion > 0){

            this.processInput();

            this.setState({
                currentQuestion: currentQuestion-1
            });
        }
    }

    /**
     * move to the next question only if there are other questions left
     */
    handleForwardButtonClick = () => {
        const{questions, currentQuestion, questionsReqInput} = this.state
        if(currentQuestion < questions.length){

            this.processInput();

            this.setState({
                currentQuestion: currentQuestion+1
            });
        }
    }

    /**
     * check if an answer has been selected for every question
     */
    isCompleted = () => {
        const{questions, questionsReqInput} = this.state;
        let isComplete = true;
        questions.forEach(question => {
            //check for empty input
            if(questionsReqInput.find(element => element === question.questionId)){
                //it seems the input length will always be 1
                if(question.input.length > 0){
                    if(question.input[0] === ""){
                        isComplete = false;
                    }
                } else if(/*!question.input || !question.input.length || */!question.answerOptions.find(element => element.selected === true)){
                    isComplete = false;
                }
            } else if(! question.answerOptions.find(element => element.selected === true)){
                isComplete = false;
            }
        });
        return isComplete;
    }

    /**
     * change @questions completion status
     */
    handleFinishButtonClick = () => {
        if(this.isCompleted() === true){
            this.setState({
                complete: true
            });
            this.props.history.push(`/professionalDashboard/${JSON.parse(localStorage.getItem('user')).username}-${JSON.parse(localStorage.getItem('user'))._id}`)
        } else {
            alert("You still have some questions to complete.");
        }
    }
    
    render(){
        let {questions, currentQuestion, complete, questionsReqInput, invalidInput} = this.state;

        return(
            
            <div className=""> 
                { complete ? (
                    <Test 
                        //
                        questions = {questions}
                        questionsReqInput = {questionsReqInput}
                    />
                ) : ( 
                        <div className="basic-wrap">
                            <div className="question-section">
                                <Question
                                    question = {questions[currentQuestion]}
                                    questionsLength = {questions.length}
                                    currentQuestion = {currentQuestion}
                                />
                            </div>

                            <div className="answer-section">
                                <Answer 
                                    answer = {questions[currentQuestion].answerOptions}
                                    questions = {questions}
                                    currentQuestion = {currentQuestion}
                                    questionsReqInput = {questionsReqInput}
                                    handleAnswerButtonClick = {this.handleAnswerButtonClick}
                                />
                            </div>

                            <div>
                                <button id="backward-btn" disabled={currentQuestion===0 ? true: false} onClick={() => this.handleBackButtonClick()}>ᐊ</button>
                                <button id="forward-btn" disabled={currentQuestion===questions.length-1 ? true: false} style={{ display: currentQuestion===questions.length-1 ? 'none' : null }} onClick={() => this.handleForwardButtonClick()}>ᐅ</button>
                                {/* ERROR display still in progress <div id="inputAlert" className="input-alert disabled">ERROR! Invalid input.</div> */}
                                <button id="finish-btn" style = {{ display: currentQuestion===questions.length-1 ? null : 'none'}} onClick={() => this.handleFinishButtonClick()}>FINISH</button>
                            </div>
                            </div>
                )}
            </div>
        );
    }
}
