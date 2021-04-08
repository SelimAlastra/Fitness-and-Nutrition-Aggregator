import React, { Component } from 'react';
import Question from './components/question';
import Answer from './components/answer';
import { Carousel } from 'react-bootstrap';
import './styling/quizUser.css';

var associatedTags = [];

// stored values that will be passed to the databse
var details = {
    associatedTags: [],
    goals: [],
    weight: '',
    gender: '',
    isNew: false,
    yearsOfExperience: '',
    date: new Date(),
    bodyType: '',
}

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
        complete: false,
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
    }

    /**
     * if question requires input, add input value 
     * if there is already an input value, pop it and add new value
     */
    processInput = () => {
        const{questions, currentQuestion, questionsReqInput, isClient} = this.state;
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

        // process input into tags if such answer has been selected and input was provided
        if((isClient && questions[currentQuestion].questionId === 10) || !isClient && questions[currentQuestion].questionId === 6){
            const answerWithInput = answers.find(answer => answer.requireInput === true);

            if(answerWithInput.input[0]) {
                answerWithInput.tags = answerWithInput.input[0].replace(/,|#|;|_/g, " ").toLowerCase().replace(/\./g, ' ').replace(/\s+/g, ' ').trim().split(' ');
            }

            // add selected answers' tags
            answers.forEach(answer => {
                if(answer.selected){
                    answer.tags.forEach(tag => {
                        if(answerWithInput.tags.find(existingTag => existingTag === tag) === undefined && tag !== ""){
                            answerWithInput.tags.push(tag)
                        }
                    });
                }
            });
        }
    }

    /**
     * process the date of birth
     * note: the received date of birth is in the format DD/MM/YYYY
     */
    processDOB = (dob) => {
        const {questions} = this.state;
        if(dob!== undefined) {
            const date = dob.split("/");
            details.date = new Date(`${date[2]}-${date[1]}-${date[0]}`);
            questions.find(question => question.questionId === 2).dob = dob;
        }
    }

    /**
     * move to the previous question, only if there are previos questions
     */
    handleBackButtonClick = () => {
        const{currentQuestion} = this.state
        if(currentQuestion > 0){
            if(document.getElementById("DatePicker")) {
                this.processDOB(document.getElementById("DatePicker").value);
            }
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
            if(document.getElementById("DatePicker")) {
                this.processDOB(document.getElementById("DatePicker").value);
            }
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
            if(question.questionId !== 2){

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
                } else if(question.answerOptions.find(element => element.selected === true) === undefined){
                    isComplete = false;
                }
            }
        });
        return isComplete;
    }

    /**
     * add tags based on user selection during the quizz
     */
    addTags = () => {
        const {questions} = this.state;
        questions.forEach(question => {
            const answers = question.answerOptions;

            answers.forEach(answer => {
                if(answer.selected === true){
                    answer.tags.forEach(tag => {
                        if(tag !== ""){
                            associatedTags.push(tag);
                            details.associatedTags.push(tag);
                        }
                    });
                }
            });
        });
        associatedTags = associatedTags.reverse();
    }

    /**
     * update selected goals
     */
    addGoals = () => {
        const {questions} = this.state;
        const answers = questions[6].answerOptions;

        answers.forEach(answer => {
            if(answer.selected === true){
                const goal = answer.answerText;
                if(goal !== ""){
                    details.goals.push(goal);
                }
            }
        });
    }

    /**
     * update selected gender
     */
    updateGender = () => {
        const {questions} = this.state;
        const answers = questions[0].answerOptions;

        answers.forEach(answer => {
            if(answer.selected === true){
                const answerGender = answer.answerText;
                if(answerGender !== ""){
                    details.gender = answerGender;
                }
            }
        });
    }

    /**
     * if the user has input text about his/her bodytype, it is saved in the input answer and must be retrieved from input[]
     * otherwise, select the first tag of the selected answer 
     */
     updateBodyType = () => {
        const {questions} = this.state;
        const answers = questions[3].answerOptions;
        answers.forEach(answer => {
            if(answer.selected === true && answer.requireInput === false){
                details.bodyType = answer.tags[0];
            } else if(answer.selected === true && answer.requireInput === true){
                if(answer.input[0] !== undefined) details.bodyType = answer.input[0];
            }
        })
    }

    /**
     * 
     */
    updateClientDetails = () => {
        const {questions} = this.state;
        
        let answer = questions[2];
        const answerWeight = answer.input[0];
        if(answerWeight !== ""){
            details.weight = answerWeight;
        }

        this.updateGender();
        this.updateBodyType();
        this.addGoals();
        details.isNew = true;
    }

    

    /**
     * 
     */
    updateYearsOfExperience = () => {
        const {questions} = this.state;
        const answers = questions[1].answerOptions;

        answers.forEach(answer => {
            if(answer.selected === true){
                const yearsOfExperience = answer.answerText;
                if(yearsOfExperience !== ""){
                    details.yearsOfExperience = yearsOfExperience;
                }
            }
        });
    }

    /**
     * 
     */
    updateProfessionalDetails = () => {
        this.updateGender();
        this.updateYearsOfExperience();
        details.isNew = true;
    }

    /**
     * change @questions completion status
     */
    HandleFinishButtonClick = () => {
        const {isClient} = this.state;
        this.processInput();
        if(this.isCompleted() === true){
            this.addTags();
            this.setState({
                complete: true
            });
            if(isClient) {
                // update the db
                this.updateClientDetails();
                this.props.history.push({
                    pathname: `/clientDashboard/${JSON.parse(localStorage.getItem('user'))._id}`,
                    state: {fromQuiz: true}});
            } else {
                // update the db 
                this.updateProfessionalDetails();
                this.props.history.push(`/professionalDashboard/${JSON.parse(localStorage.getItem('user'))._id}`);
            }
        } else {
            alert("You still have some questions to complete.");
        }
    }
    
    render(){
        let {questions, currentQuestion, complete, questionsReqInput, isClient, associatedTags} = this.state;
        
        return(
            <div className="quizz">
            <Carousel className="carousel" nextIcon="" nextLabel="" prevIcon="" prevLabel="">
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100 fixedimg"
                            src="https://console.kr-asia.com/wp-content/uploads/2019/12/meghan-holmes-buWcS7G1_28-unsplash.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100 fixedimg"
                            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100 fixedimg"
                            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1635&q=80"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100 fixedimg"
                            src="https://images.unsplash.com/photo-1510027580951-31747e2371a9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100 fixedimg"
                            src="https://images.unsplash.com/photo-1517363898874-737b62a7db91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1558&q=80"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100 fixedimg"
                            src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item class="d-none d-md-block">
                        <img
                            className="d-block w-100 fixedimg"
                            src="https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                            alt="First slide"
                        />
                    </Carousel.Item>
            </Carousel>
            <div> 
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
                                    isClient = {isClient}
                                />
                            </div>

                            <div className="quizBtn">
                                <button id="backward-btn" disabled={currentQuestion===0 ? true: false} onClick={() => this.handleBackButtonClick()}>ᐊ</button>
                                <button id="forward-btn" disabled={currentQuestion===questions.length-1 ? true: false} style={{ display: currentQuestion===questions.length-1 ? 'none' : null }} onClick={() => this.handleForwardButtonClick()}>ᐅ</button>
                                {/* ERROR display still in progress <div id="inputAlert" className="input-alert disabled">ERROR! Invalid input.</div> */}
                                <button id="finish-btn" style = {{ display: currentQuestion===questions.length-1 ? null : 'none'}} onClick={() => this.HandleFinishButtonClick()}>FINISH</button>
                            </div>
                            </div>
                )}
            </div>
            </div>
        );
    }
}
export {associatedTags}
export {details}