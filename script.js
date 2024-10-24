const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2,
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: 2,
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
        answer: 0,
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
        answer: 1,
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Osmium", "Silver"],
        answer: 0,
    },
];

let score = 0;
let timeLeft = 30;
let timer;
let scoreHistory = [];

function loadQuiz() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    // Shuffle questions
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    shuffledQuestions.forEach((q, index) => {
        const questionElement = document.createElement("div");
        questionElement.className = "question";
        
        questionElement.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${option}
                </label><br>
            `).join('')}
        `;
        
        quizContainer.appendChild(questionElement);
    });

    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time").innerText = timeLeft;
        } else {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    clearInterval(timer);
    score = 0;

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });

    scoreHistory.push(score);
    displayResult();
}

function displayResult() {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `Your score: ${score} out of ${questions.length}`;
    resultContainer.classList.remove("hidden");
    document.getElementById("submit").classList.add("hidden");
    document.getElementById("retake").classList.remove("hidden");
    updateScoreHistory();
}

function updateScoreHistory() {
    const scoreHistoryContainer = document.getElementById("scoreHistory");
    scoreHistoryContainer.innerHTML = "";
    scoreHistory.forEach((s, index) => {
        const li = document.createElement("li");
        li.innerText = `Attempt ${index + 1}: ${s} / ${questions.length}`;
        scoreHistoryContainer.appendChild(li);
    });
}

function retakeQuiz() {
    score = 0;
    timeLeft = 30;
    document.getElementById("result").classList.add("hidden");
    loadQuiz();
    document.getElementById("submit").classList.remove("hidden");
    document.getElementById("retake").classList.add("hidden");
}
loadQuiz();