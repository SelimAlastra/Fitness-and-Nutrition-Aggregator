const questionsClient = [
    {
        questionText: "What gender do you identify with?",
        questionId: 1,
        answerOptions: [
            { answerText: "Female", selected:false, requireInput: false, tags:["womensfitness"] },
            { answerText: "Male", selected:false, requireInput: false, tags:["menfitness"] },
            { answerText: "Other", selected:false,requireInput: false, tags:[""] },
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
            { answerText: "Short and sturdy", selected:false, tags:["short", "shortperson"], requireInput: false },
            { answerText: "Lean and long", selected:false, tags:["tall", "ectomorph"], requireInput: false },
            { answerText: "Tall and heavy", selected:false, tags:["tall", "endomorph", "bodybuilding"], requireInput: false },
            { answerText: "Athletic, with a high metabolism", selected:false, tags:["athletic", "mesomorph"], requireInput: false },
            { answerText: "Soft and with a tendency to store body fat", selected:false, tags:["endomorph", "fatloss"], requireInput: false },
            { answerText: "Average", selected:false, tags:["average"], requireInput: false },
            { answerText: "Other:", selected:false, tags:[""], requireInput: true, placeholder: "e.g.: Fragile", alert: ["Answer using letters only."], input: [] }
        ],
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
            { answerText: "Other:", selected: false, tags:[""], requireInput: true, placeholder: "e.g.: Vegetarian", alert: ["Answer using letters only."], input: [] }
        ],
    },{
        questionText: "What's your primary fitness goal? (multiple selections allowed)",
        questionId: 8,
        answerOptions: [
            { answerText: "lose fat", selected:false, tags:["losefat", "weightloss", "fatlosstips", "diet", "weightlossjourney", "sweat"], requireInput: false },
            { answerText: "get fit/look great at the beach", selected:false, tags:["getfit", "cardio", "fitnessmodel", "crossfit"], requireInput: false },
            { answerText: "recover from an injury", selected:false, tags:[""], requireInput: false },
            { answerText: "build endurance/run a marathon", selected:false, tags:[""], requireInput: false },
            { answerText: "fitness as a social activity", selected:false, tags:[""], requireInput: false },
            { answerText: "train discipline and focus", selected:false, tags:[""], requireInput: false },
            { answerText: "build strength and ability", selected:false, tags:["calisthenics", "bodyweight", "bodybuilding", "crossfit", "strength", "athlete", "core"], requireInput: false },
            { answerText: "build mad muscle mass", selected:false, tags:["beastmode", "bodybuilding", "strength", "powerlifting", "weightlifting", "strongman"], requireInput: false }
        ],
    },{ 
        questionText: "Where is your favorite place to exercise?",
        questionId: 9,
        answerOptions: [
            { answerText: "gym", selected:false, tags:[""], requireInput: false },
            { answerText: "outdoors", selected:false, tags:["outdoor", "outdoortraining", "outdoorworkout", "nature"], requireInput: false },
            { answerText: "home", selected:false, tags:["home", "homeworkout", "homegym", "quarantine", "nogymnoproblem"], requireInput: false },
        ],
    },{ 
        questionText: "Lastly, which of the following are you interested in?",
        questionId: 10,
        answerOptions: [
            { answerText: "#mindset", selected:false, tags:["mindset", "motivation", "goals"], requireInput: false },
            { answerText: "#nutrition", selected:false, tags:["nutrition", "diet"], requireInput: false },
            { answerText: "#jogging", selected:false, tags:["jogging", "running"], requireInput: false },
            { answerText: "#bodyweightworkout", selected:false, tags:["bodyweightworkou", "calisthenics"], requireInput: false },
            { answerText: "#bodybuilding", selected:false, tags:["bodybuilding", "gains", "muscle"], requireInput: false },
            { answerText: "#powerlifting", selected:false, tags:["powerlifting", "deadlifting"], requireInput: false },
            { answerText: "Add your own:", selected: false, tags:[""], requireInput: true, placeholder: "e.g.: crossfit, boxing", alert: ["Answer using letters and numbers only."], input: [] }
        ],
    }
];

const questionsReqInputClient = [3,4];
const questionsMultipleChoicesClient = [8,11];

export {questionsClient,questionsReqInputClient,questionsMultipleChoicesClient}