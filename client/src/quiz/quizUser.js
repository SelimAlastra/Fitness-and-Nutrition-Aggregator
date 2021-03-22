import React, { Component } from 'react';
import Question from './components/question';
import Answer from './components/answer';
import Test from './testPage';
import './styling/quizUser.css';

//const history = useHistory();

var associatedTags = [];

export default class Quiz extends Component{

    state = {
        questions: [
            {
                questionText: "Are you a woman or a man?",
                questionId: 1,
                answerOptions: [
                    { answerText: "Woman", selected:false, requireInput: false, tags:["womensfitness"] },
                    { answerText: "Man", selected:false, requireInput: false, tags:["menfitness"] },
                ],
            },{
                questionText: "What is your age range?",
                questionId: 2,
                answerOptions: [
                    { answerText: "Teens", selected:false, requireInput: false, tags:[""] },
                    { answerText: "20's", selected:false, requireInput: false, tags:[""] },
                    { answerText: "30's", selected:false, requireInput: false, tags:[""] },
                    { answerText: "40's", selected:false, requireInput: false, tags:[""] },
                    { answerText: "50's", selected:false, requireInput: false, tags:[""] },
                    { answerText: "60+", selected:false, requireInput: false, tags:[""] },
                ],
            },{
                questionText: "What is your height?",
                questionId: 3,
                answerOptions: [
                    { answerText: "metric", selected:true, requireInput: false, tags:[""]  },
                    { answerText: "imperial", selected:false, requireInput: false, tags:[""] },
                ],
                input:[], placeholder: ["cm", "feet, inches"], alert: ["Type only numeric values. (e.g.: 177)", "Type numeric values. (e.g.: 5 8, 6 2)"]
            },{
                questionText: "What is your weight?",
                questionId: 4,
                answerOptions: [
                    { answerText: "Kilograms(kg)", selected:true, requireInput: false, tags:[""] },
                    { answerText: "Pounds(lb)", selected:false, requireInput: false, tags:[""] },
                ],
                input:[], placeholder: ["kg","lb"], alert: ["Type only numeric values. (e.g.: 82)", "Type only numeric values. (e.g.: 160)"]
            },{
                questionText: "What best describes your body?",
                questionId: 5,
                answerOptions: [
                    { answerText: "Lean and long", selected:false, tags:["tall", "ectomorph"], requireInput: false },
                    { answerText: "Tall and heavy", selected:false, tags:["tall", "endomorph", "bodybuilding"], requireInput: false },
                    { answerText: "Athletic, with a high metabolism", selected:false, tags:["athletic", "mesomorph"], requireInput: false },
                    { answerText: "Soft and with a tendency to store body fat", selected:false, tags:["endomorph", "fatloss"], requireInput: false },
                    { answerText: "Average", selected:false, tags:["average"], requireInput: false },
                    { answerText: "Other:", selected:false, tags:[""], requireInput: true, placeholder: "e.g.: Fragile", alert: ["Answer using letters only."] }
                ],
                // input:[]
            },{
                questionText: "Which best describes your current activity level?",
                questionId: 6,
                answerOptions: [
                    { answerText: "minimum physical activity", selected:false, tags:["beginner"], requireInput: false },
                    { answerText: "generally active, but not fitness related", selected:false, tags:["beginner"], requireInput: false },
                    { answerText: "exercise 2-4 times/week", selected:false, tags:["intermediate"], requireInput: false },
                    { answerText: "sweat it out on a daily basis", selected:false, tags:["advanced"], requireInput: false },
                ],
            },{
                questionText: "Which best describes your current diet?",
                questionId: 7,
                answerOptions: [
                    { answerText: "can't seem to find my appetite", selected:false, tags:["anorexic", "nutrition"], requireInput: false },
                    { answerText: "I snack a little too much", selected:false, tags:["dietplan", "nutrition", "fatloss"], requireInput: false },
                    { answerText: "avoid highly processed snacks, but enjoy cheat days", selected:false, tags:["healthylifestyle"], requireInput: false },
                    { answerText: "healthy and balanced diet", selected:false, tags:["healthylifestyle"], requireInput: false },
                    { answerText: "Other:", selected: false, tags:[""], requireInput: true, placeholder: "e.g.: Vegetarian", alert: ["Answer using letters only."] }
                ],
                // input:[]
            },{
                questionText: "What's your primary fitness goal?",
                questionId: 8,
                answerOptions: [
                    { answerText: "lose fat", selected:false, tags:["losefat", "weightloss", "fatlosstips", "diet", "weightlossjourney", "sweat"], requireInput: false },
                    { answerText: "look great at the beach", selected:false, tags:["getfit", "cardio", "fitnessmodel", "crossfit"], requireInput: false },
                    { answerText: "build strength and ability", selected:false, tags:["calisthenics", "bodyweight", "bodybuilding", "crossfit", "strength", "athlete", "core"], requireInput: false },
                    { answerText: "build mad muscle mass", selected:false, tags:["beastmode", "bodybuilding", "strength", "powerlifting", "weightlifting", "strongman"], requireInput: false },
                    { answerText: "Other:", selected: false, tags:[""], requireInput: true, placeholder: "e.g.: do 100 pushups in one set", alert: ["Answer using letters and numbers only."] }
                ],
                // input:[]
            },{
                questionText: "During the average week, how much time are you able to devote to your fitness regimen?",
                questionId: 9,
                answerOptions: [
                    { answerText: "barely 15-30 min on any given day", selected:false, tags:[""], requireInput: false },
                    { answerText: "about one hour per day, 3-5 days a week", selected:false, tags:[""], requireInput: false },
                    { answerText: "an hour or more on most days", selected:false, tags:[""], requireInput: false },
                    { answerText: "Other:", selected: false, tags:[""], requireInput: true, placeholder: "e.g.: 1 hour each day during weekend", alert: ["Answer using letters and numbers only."] }
                ],
                // input:[]
            },{ 
                questionText: "Where is your favorite place to exercise?",
                questionId: 10,
                answerOptions: [
                    { answerText: "gym", selected:false, tags:[""], requireInput: false },
                    { answerText: "outdoors", selected:false, tags:["outdoor", "outdoortraining", "outdoorworkout", "nature"], requireInput: false },
                    { answerText: "home", selected:false, tags:["home", "homeworkout", "homegym", "quarantine", "nogymnoproblem"], requireInput: false },
                ],
            },{ 
                questionText: "How much are you willing to spend? (gym membership, gear & equipment)",
                questionId: 11,
                answerOptions: [
                    { answerText: "not much", selected:false, tags:["nocost"], requireInput: false },
                    { answerText: "a fair amount", selected:false, tags:[""], requireInput: false },
                    { answerText: "no budget limit", selected:false, tags:[""], requireInput: false },
                    // { answerText: "Other(per month):", selected: false, tags:[""], requireInput: true, placeholder: "e.g.: 100 pounds", alert: ["Answer using letters and numbers only."] }
                ],
                // input:[]
            },{ 
                questionText: "Lastly, which of the following are you interested in?",
                questionId: 12,
                answerOptions: [
                    { answerText: "#mindset", selected:false, tags:[""], requireInput: false },
                    { answerText: "#nutrition", selected:false, tags:["nutrition", "diet"], requireInput: false },
                    { answerText: "#jogging", selected:false, tags:["jogging", "running"], requireInput: false },
                    { answerText: "#bodyweightworkout", selected:false, tags:["bodyweightworkou", "calisthenics"], requireInput: false },
                    { answerText: "#bodybuilding", selected:false, tags:["bodybuilding", "gains", "muscle"], requireInput: false },
                    { answerText: "#powerlifting", selected:false, tags:["powerlifting", "deadlifting"], requireInput: false },
                    // { answerText: "Add your own:", selected: false, tags:[""], requireInput: true, placeholder: "e.g.: crossfit, boxing", alert: ["Answer using letters and numbers only."] }
                ],
                // input:[]
            }
        ],

        // identify questions that require input for all selections by adding their ID in this array
        questionsReqInput: [3,4],

        currentQuestion: 0,
        complete: false
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
        let displayNext = true;

        // remove previously selected answer
        if(newItems[currentQuestion].answerOptions.find(element => element.selected === true)){
            const answerSelected = newItems[currentQuestion].answerOptions.find(element => element.selected === true);
            
            //certain questions require multiple answer selections
            if(questions[currentQuestion].id !== 12){
                answerSelected.selected = false; 
            }
            displayNext = false;

            // if question required input, clear saved input
            if(questionsReqInput.find(element => element === newItems[currentQuestion].questionId)){
                newItems[currentQuestion].input.pop();
            }
        }

        // set new selected answer 
        if(newItems[currentQuestion].answerOptions.find(element => element === answer)){
            const answerToSelect = newItems[currentQuestion].answerOptions.find(element => element === answer);
            answerToSelect.selected = true;
            if(answerToSelect.requireInput === true){
                displayNext = false;
            }
        }

        //update the @questions values
        this.setState({
            questions : newItems
        })

        if(currentQuestion + 1 < questions.length){
            if(displayNext === true && !questionsReqInput.find(element => element === questions[currentQuestion].questionId)){
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
        console.log(questions[currentQuestion].input[0]);
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
        if(this.isCompleted() === true){
            this.addTags();
            console.log(this.associatedTags);
            this.setState({
                complete: true
            });
            this.props.history.push(`/clientDashboard/${JSON.parse(localStorage.getItem('user')).username}-${JSON.parse(localStorage.getItem('user'))._id}`)
        } else {
            alert("You still have some questions to complete.");
        }
    }
    
    render(){
        let {questions, currentQuestion, complete, questionsReqInput, associatedTags} = this.state;

        return(
            
            <div className=""> 
                { complete ? (
                    <Test 
                        //
                        questions = {questions}
                        questionsReqInput = {questionsReqInput}
                        tags = {associatedTags}
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

export {associatedTags}