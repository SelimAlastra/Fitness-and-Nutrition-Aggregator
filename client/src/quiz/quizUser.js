import React, { Component } from 'react';
import Question from './components/question';
import Answer from './components/answer';
import Test from './testPage';
import './styling/quizUser.css';

//const history = useHistory();

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
                questionText: "What is your age range?",
                questionId: 2,
                answerOptions: [
                    { answerText: "Teens", selected:false },
                    { answerText: "20's", selected:false },
                    { answerText: "30's", selected:false },
                    { answerText: "40's", selected:false },
                    { answerText: "50's", selected:false },
                    { answerText: "60+", selected:false },
                ],
            },{
                questionText: "What is your height?",
                questionId: 3,
                answerOptions: [
                    { answerText: "metric", selected:true  },
                    { answerText: "imperial", selected:false },
                ],
                input:[], placeholder: ["cm", "feet, inches"], alert: ["e.g.: 177", "e.g.: 5 8"]
            },{
                questionText: "What is your weight?",
                questionId: 4,
                answerOptions: [
                    { answerText: "Kilograms(kg)", selected:true },
                    { answerText: "Pounds(lb)", selected:false },
                ],
                input:[], placeholder: ["kg","lb"],
            },{
                questionText: "What best describes your body?",
                questionId: 5,
                answerOptions: [
                    { answerText: "Lean and long, finding it hard to gain muscle mass", selected:false },
                    { answerText: "Athletic, with a high metabolism", selected:false },
                    { answerText: "Soft and round body, with a tendency to store body fat", selected:false },
                ],
            },{
                questionText: "Which best describes your current activity level?",
                questionId: 6,
                answerOptions: [
                    { answerText: "stationary job and minimum physical activity", selected:false },
                    { answerText: "generally active, but not fitness related", selected:false },
                    { answerText: "exercise 2-4 times/week", selected:false },
                    { answerText: "sweat it out on a daily basis", selected:false },
                ],
            },{
                questionText: "Which best describes your current diet?",
                questionId: 7,
                answerOptions: [
                    { answerText: "can't seem to find my appetite", selected:false },
                    { answerText: "I snack a little too much", selected:false },
                    { answerText: "avoid highly processed snacks, but enjoy cheat days", selected:false },
                    { answerText: "healthy and balanced diet", selected:false },
                ],
            },{
                questionText: "What's your primary fitness goal?",
                questionId: 8,
                answerOptions: [
                    { answerText: "lose fat", selected:false },
                    { answerText: "look great at the beach", selected:false },
                    { answerText: "build strength and ability", selected:false },
                    { answerText: "build mad muscle mass", selected:false },
                ],
            },{
                questionText: "During the average week, how much time are you able to devote to your fitness regimen?",
                questionId: 9,
                answerOptions: [
                    { answerText: "barely 15-30 min on any given day", selected:false },
                    { answerText: "about one hour per day, 3-5 days a week", selected:false },
                    { answerText: "an hour or more on most days", selected:false },
                ],
            },{ 
                questionText: "Where is your favorite place to exercise?",
                questionId: 10,
                answerOptions: [
                    { answerText: "gym", selected:false },
                    { answerText: "outdoors", selected:false },
                    { answerText: "home", selected:false },
                ],
            },{ 
                questionText: "How much are you willing to spend? (gym membership, gear & equipment)",
                questionId: 11,
                answerOptions: [
                    { answerText: "not much", selected:false },
                    { answerText: "a fair amount", selected:false },
                    { answerText: "no budget limit", selected:false },
                ],
            }
        ],

        // identify all questions that require input by adding their ID in this array
        questionsReqInput: [3,4],

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
            this.props.history.push(`/clientDashboard/${JSON.parse(localStorage.getItem('user')).username}-${JSON.parse(localStorage.getItem('user'))._id}`)
        } else {
            alert("You still have some questions to complete.");
        }
    }
    
    render(){
        let {questions, currentQuestion, complete, questionsReqInput, invalidInput} = this.state;

        return(
            <div>
            <img className="backgroundJPG"
            src="https://static.onecms.io/wp-content/uploads/sites/35/2010/07/28170650/fb-interval-training-workouts.jpg" />
            
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
            </div>
        );
    }
}
