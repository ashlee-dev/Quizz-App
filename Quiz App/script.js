const quizData = [
    {
        question: "What is the capital of Japan?",
        a: "Seoul",
        b: "Tokyo",
        c: "Bangkok",
        d: "Beijing",
        correct: "b"
    },
    {
        question: "What is the largest mammal in the world?",
        a: "Elephant",
        b: "Blue Whale",
        c: "Great White Shark",
        d: "Giraffe",
        correct: "b"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        a: "Gold",
        b: "Oxygen",
        c: "Silver",
        d: "Iron",
        correct: "b"
    },
    {
        question: "Who painted the Mona Lisa?",
        a: "Vincent Van Gogh",
        b: "Pablo Picasso",
        c: "Leonardo da Vinci",
        d: "Claude Monet",
        correct: "c"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 30;

// Load and shuffle the quiz
function loadQuiz() {
    shuffleArray(quizData);
    loadQuestion();
    startTimer();
}

// Shuffle the quiz data
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load a question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = `
        <div class="question">
            <h3>${currentQuestion.question}</h3>
            <label><input type="radio" name="answer" value="a">${currentQuestion.a}</label><br>
            <label><input type="radio" name="answer" value="b">${currentQuestion.b}</label><br>
            <label><input type="radio" name="answer" value="c">${currentQuestion.c}</label><br>
            <label><input type="radio" name="answer" value="d">${currentQuestion.d}</label><br>
        </div>
    `;
}

// Calculate the score
function calculateScore() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer && selectedAnswer.value === quizData[currentQuestionIndex].correct) {
        score++;
    }
}

// Show the score
function showScore() {
    clearInterval(timer);
    document.getElementById('score').textContent = score;
    document.getElementById('score-container').classList.remove('hidden');
    document.getElementById('quiz-container').classList.add('hidden');
}

// Start the timer
function startTimer() {
    let timeLeft = timeLimit;
    document.getElementById('time').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            calculateScore();
            showScore();
        }
    }, 1000);
}

// Event listeners
document.getElementById('submit-btn').addEventListener('click', () => {
    calculateScore();
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

document.getElementById('retry-btn').addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('score-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    loadQuiz();
});

// Initial load
loadQuiz();
