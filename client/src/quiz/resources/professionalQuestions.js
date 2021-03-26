const questions = [
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
            { answerText: "Nutrition advice", selected:false },
            { answerText: "Yoga, pilates", selected:false },
            { answerText: "Cardio and weight loss", selected:false },
            { answerText: "", selected:false },
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
        questionText: "Select or add tags associated with your content:",
        questionId: 6,
        answerOptions: [
            { answerText: "crossfit", selected:false },
            { answerText: "muscle", selected:false },
            { answerText: " ", selected:false },
            { answerText: " ", selected:false },
            /** e.g.: #aerobic, #plyometric  */
        ],
    },
];

const questionsReqInput = [6];
const questionsMultipleChoices = [];

export {questions,questionsReqInput,questionsMultipleChoices}
