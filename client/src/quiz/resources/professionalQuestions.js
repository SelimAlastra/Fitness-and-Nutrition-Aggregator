const questionsProfessional = [
    {
        questionText: "What gender do you identify with?",
        questionId: 1,
        answerOptions: [
            { answerText: "Female", selected:false, requireInput: false, tags:[""] },
            { answerText: "Male", selected:false, requireInput: false, tags:[""] },
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
            { answerText: "Yoga, pilates", selected:false, requireInput: false, tags:["yoga", "pilates"] },
            { answerText: "Cardio and weight loss", selected:false, requireInput: false, tags:["cardio", "weightloss", "fatloss"] },
            { answerText: "Weight training and strength focused", selected:false, requireInput: false, tags:["weighttraining", "weightlifting", "strength", "gains"] },
            { answerText: "All-around and complex", selected:false, requireInput: false, tags:["complex"] },
            { answerText: "Other:", selected: false, tags:[""], requireInput: true, placeholder: "", alert: ["Answer using letters only."], input: [] }
        ],
    },{
        questionText: "Do you offer diet advice?",
        questionId: 4,
        answerOptions: [
            { answerText: "Yes", selected:false, requireInput: false, tags:["diet", "nutrition"] },
            { answerText: "No", selected:false, requireInput: false, tags:[""] },
        ],
    },{
        questionText: "Do you preffer online/in person sessions?",
        questionId: 5,
        answerOptions: [
            { answerText: "Online", selected:false, requireInput: false, tags:["online"] },
            { answerText: "In person", selected:false, requireInput: false, tags:["inperson"] },
            { answerText: "Both", selected:false, requireInput: false, tags:["online", "inperson"] },
        ],
    },{
        questionText: "Select or add tags associated with your content:",
        questionId: 6,
        answerOptions: [
            { answerText: "crossfit", selected:false, requireInput: false, tags:["crossfit"] },
            { answerText: "weightlifting", selected:false, requireInput: false, tags:["weightlifting"] },
            { answerText: "bodyweight", selected:false, requireInput: false, tags:["bodyweight"] },
            { answerText: "functionaltraining", selected:false, requireInput: false, tags:["functionaltraining"] },
            { answerText: "Other:", selected: false, tags:[""], requireInput: true, placeholder: "e.g.: aerobic, plyometric, boxing", alert: ["Answer using letters only."], input: [] }
        ],
    },
];

const questionsReqInputProfessional = [];
const questionsMultipleChoicesProfessional = [6];

export {questionsProfessional,questionsReqInputProfessional,questionsMultipleChoicesProfessional}
