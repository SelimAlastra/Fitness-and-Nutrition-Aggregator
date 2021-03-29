import React, { Component } from 'react';
import Question from './components/question';
import Answer from './components/answer';
import './styling/quizUser.css';

var associatedTags = [];

export default class Quiz extends Component{

    state = {
        questions: this.props.questions,

        // identify questions that require input for all selections by adding their ID in this array
        questionsReqInput: this.props.questionsReqInput,
        // identify questions that accept multiple selections by adding their ID in this array
        questionsMultipleChoices: this.props.questionsMultipleChoices,
        // @true if it is client's and @false if it is a professional's quiz 
        isClient: this.props.isClient,

        currentQuestion: 0,
        complete: false
    }

    /** 
     * @return true if question allows for multiple answer selections
     * @return false otherwise
    */
    checkMultipleAllowed = () => {
        const{questions, currentQuestion, questionsMultipleChoices} = this.state;
        if(questionsMultipleChoices.find(element => element === questions[currentQuestion].questionId)){
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return true if question answers requires input
     * @return false otherwise
     */
    checkReqInput = () => {
        const{questions, currentQuestion, questionsReqInput} = this.state;
        if(questionsReqInput.find(element => element === questions[currentQuestion].questionId)){
            return true;
        } else {
            return false;
        }
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
        const{questions, currentQuestion} = this.state;
        let newItems = [...questions];
        let newAnswer = newItems[currentQuestion].answerOptions.find(element => element === answer);

        // used to determine whether the next question will be automatically displayed or not (Yes if @true, No if @false)
        let displayNext = true;

        // if answer already selected, keep on the same question 
        if(newItems[currentQuestion].answerOptions.find(element => element.selected === true)){
            displayNext = false;
        }

        // certain questions require multiple answer selections
        if(this.checkMultipleAllowed() === false){
            // remove previously selected answer
            if(newItems[currentQuestion].answerOptions.find(element => element.selected === true)){
                const answerSelected = newItems[currentQuestion].answerOptions.find(element => element.selected === true);
                answerSelected.selected = false; 
            }
            // set new selected answer 
            newAnswer.selected = true;
        } else {
            // select or deselect answer
            if(newAnswer.selected === true){
                newAnswer.selected = false;
            } else {
                newAnswer.selected = true;
            }
        }

        // if question required input, clear saved input
        if(this.checkReqInput()){
            newItems[currentQuestion].input.pop();
        }
        
        // keep on the same question when there is need for input
        if(newAnswer.requireInput === true){
            displayNext = false;
        }

        // update the state
        if(currentQuestion + 1 < questions.length){
            if(displayNext === true && this.checkReqInput()===false){
                this.setState({
                    questions : newItems,
                    currentQuestion: currentQuestion+1
                });
            } else {
                this.setState({
                    questions : newItems
                });
            }
        }

        console.log(questions[currentQuestion].answerOptions);
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
     * @return index of selected answer (type: INT)
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
     * re-set the current state questions
     */
    refresh = (newQuestions) => {
        this.setState({
            questions : newQuestions
        });
    }

    /**
     * @param input is the value that seeks approval to be saved as user input
     */
    addInput = (input) => {
        const{questions, currentQuestion} = this.state;
        questions[currentQuestion].input.push(input);
        console.log("input: " + questions[currentQuestion].input[0]);
    }

    /**
     * if question requires input, add input value 
     * if there is already an input value, pop it and add new value
     */
    processInput = () => {
        const{questions, currentQuestion, questionsReqInput} = this.state;
        const answers = questions[currentQuestion].answerOptions;

        // check for question that requires input
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
            // this.processAnswerInput();

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
            // this.processAnswerInput();

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
     * add tags based on user selection during the quizz
     */
    addTags = () => {
        const {questions} = this.state;
        // let {associatedTags} = this.state;
        questions.forEach(question => {
            const answers = question.answerOptions;

            answers.forEach(answer => {
                if(answer.selected === true){
                    answer.tags.forEach(tag => {
                        if(tag !== ""){
                            associatedTags.push(tag);
                        }
                    });
                }
            });
        });
    }

    /**
     * change @questions completion status
     */
    handleFinishButtonClick = () => {
        const {isClient} = this.state;

        if(this.isCompleted() === true){
            this.addTags();
            console.log(this.associatedTags);
            this.setState({
                complete: true
            });
            if(isClient) {
                this.props.history.push(`/clientDashboard/${JSON.parse(localStorage.getItem('user'))._id}`);
            } else {
                this.props.history.push(`/professionalDashboard/${JSON.parse(localStorage.getItem('user'))._id}`);
            }
        } else {
            alert("You still have some questions to complete.");
        }
    }
    
    render(){
        let {questions, currentQuestion, complete, questionsReqInput, associatedTags} = this.state;

        return(
            <div>
            <img className="backgroundJPG"
            src="https://static.onecms.io/wp-content/uploads/sites/35/2010/07/28170650/fb-interval-training-workouts.jpg" />
            
            <div className="quizz"> 
                { complete ? (
                    <div></div>
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
                                    refresh = {this.refresh}
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
            </div>
        );
    }
}

export {associatedTags}