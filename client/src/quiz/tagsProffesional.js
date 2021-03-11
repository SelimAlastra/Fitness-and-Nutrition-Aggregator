import React, { Component } from 'react';
import Question from './components/question';
import Answer from './components/answer';
import Test from './testPage';
import './styling/quizUser.css'

export default class TagsProff extends Component{

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
        const{questions, currentQuestion, complete} = this.state;
        const newItems = [...questions]

        if(newItems[currentQuestion].answerOptions.find(element => element.selected === true)){
            const answerSelected = newItems[currentQuestion].answerOptions.find(element =>element.selected === true);
            answerSelected.selected = false; 
        }

        if(newItems[currentQuestion].answerOptions.find(element => element === answer)){
            const answerToSelect = newItems[currentQuestion].answerOptions.find(element => element === answer);
            answerToSelect.selected = true;
        }

        this.setState({
            questions : newItems
        })

        if(currentQuestion + 1 < questions.length){
            this.setState({
                currentQuestion: currentQuestion+1,
                answerToSelect : true
            });
        } else {
            alert("Well done! Now go sweat it 'till you own it!")
        }
    }

    /**
     * move to the previous question, only if there are previos questions
     */
    handleBackButtonClick = () => {
        const{currentQuestion} = this.state
        if(currentQuestion > 0){
            this.setState({
                currentQuestion: currentQuestion-1
            });
        }
    }

    /**
     * move to the next question only if there are other questions left
     */
    handleForwardButtonClick = () => {
        const{questions, currentQuestion} = this.state
        if(currentQuestion < questions.length){
            this.setState({
                currentQuestion: currentQuestion+1
            });
        }
    }

    /**
     * check if an answer has been selected for every question
     */
    isCompleted = () => {
        const{questions} = this.state
        let isComplete = true
        questions.forEach(question => {
            if(! question.answerOptions.find(element => element.selected === true)) 
                isComplete = false;
        });
        return isComplete
    }

    /**
     * redirect to the quiz submission page
     */
    handleFinishButtonClick = () => {
        const{questions, complete} = this.state

        if(this.isCompleted() === true){
            this.setState({
                complete: true
            });
        } else {
            alert("You still have some questions to complete.");
        }
        
    }
    
    render(){

        let {questions, currentQuestion, complete, questionsReqInput} = this.state;
    
        return(
            
            <div className="" /*style={{ backgroundImage: `url(${background})` }} */> 
                {complete ? (
                    <Test 
                        questions = {questions}
                    />
                ) : (
                    <>  
                        <div className="container basic-wrap">
                            {/* <img src={require('./luis-vidal.jpg')} /> */}
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
                                <button id="finish-btn" style = {{ display: currentQuestion===questions.length-1 ? null : 'none'}} onClick={() => this.handleFinishButtonClick()}>FINISH</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}