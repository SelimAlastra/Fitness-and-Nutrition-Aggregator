const questionsProfessional = [
    {
        questionText: "What gender do you identify with?",
        questionId: 1,
        answerOptions: [
            { answerText: "Woman", selected:false, requireInput: false, tags:[""] },
            { answerText: "Man", selected:false, requireInput: false, tags:[""] },
            { answerText: "Other", selected:false, requireInput: false, tags:[""] },
        ],
    },{
        questionText: "How many years have you been a personal trainer for",
        questionId: 2,
        answerOptions: [
            { answerText: "1-3 years", selected:false, requireInput: false, tags:[""] },
            { answerText: "3-5 years", selected:false, requireInput: false, tags:[""] },
            { answerText: "5-10 years", selected:false, requireInput: false, tags:[""] },
            { answerText: "10+", selected:false, requireInput: false, tags:[""] },
        ],
    },{
        questionText: "What is your primary niche?",
        questionId: 3,
        answerOptions: [
            { answerText: "Nutrition advice", selected:false, requireInput: false, tags:[""] },
            { answerText: "Yoga, pilates", selected:false, requireInput: false, tags:[""] },
            { answerText: "Cardio and weight loss", selected:false, requireInput: false, tags:[""] },
            { answerText: "", selected:false, requireInput: false, tags:[""] },
            { answerText: "Weight training and strength focused", selected:false, requireInput: false, tags:[""] },
            { answerText: "All-around and complex", selected:false, requireInput: false, tags:[""] },
            //{ answerText: "Other:", selected: false, tags:[""], requireInput: true, placeholder: "", alert: ["Answer using letters only."], input: [] }
        ],
    },{
        questionText: "Do you offer diet advice?",
        questionId: 4,
        answerOptions: [
            { answerText: "Yes", selected:false, requireInput: false, tags:[""] },
            { answerText: "No", selected:false, requireInput: false, tags:[""] },
        ],
    },{
        questionText: "Do you preffer online/in person sessions?",
        questionId: 5,
        answerOptions: [
            { answerText: "Online", selected:false, requireInput: false, tags:[""] },
            { answerText: "In person", selected:false, requireInput: false, tags:[""] },
            { answerText: "Both", selected:false, requireInput: false, tags:[""] },
        ],
    },{
        questionText: "Select or add tags associated with your content:",
        questionId: 6,
        answerOptions: [
            { answerText: "crossfit", selected:false, requireInput: false, tags:[""] },
            { answerText: "muscle", selected:false, requireInput: false, tags:[""] },
            { answerText: "bodyweight workout", selected:false, requireInput: false, tags:[""] },
            { answerText: " ", selected:false, requireInput: false, tags:[""] },
            /** e.g.: #aerobic, #plyometric  */
        ],
    },
];

const questionsReqInputProfessional = [];
const questionsMultipleChoicesProfessional = [];

export {questionsProfessional,questionsReqInputProfessional,questionsMultipleChoicesProfessional}
