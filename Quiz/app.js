// Array of question objects for the quiz
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighText Machine Language", correct: false },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "HyperText Markup Link", correct: false },
        ]
    },
    {
        question: "Which company developed the Android operating system?",
        answers: [
            { text: "Apple", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Google", correct: true },
            { text: "IBM", correct: false },
        ]
    },
    {
        question: "What is the primary function of a VPN?",
        answers: [
            { text: "To provide a secure connection over the internet", correct: true },
            { text: "To increase internet speed", correct: false },
            { text: "To block ads on websites", correct: false },
            { text: "To boost Wi-Fi signal strength", correct: false },
        ]
    },
    {
        question: "Which programming language is primarily used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Java", correct: false },
            { text: "C++", correct: false },
        ]
    },
    {
        question: "Which company developed the Windows operating system?",
        answers: [
            { text: "Apple", correct: false },
            { text: "Microsoft", correct: true },
            { text: "IBM", correct: false },
            { text: "Google", correct: false },
        ]
    },
    {
        question: "What is the main function of a router?",
        answers: [
            { text: "To store data", correct: false },
            { text: "To manage user accounts", correct: false },
            { text: "To create websites", correct: false },
            { text: "To direct data packets between networks", correct: true },
        ]
    },
    {
        question: "Which technology is used to make telephone calls over the Internet?",
        answers: [
            { text: "FTP", correct: false },
            { text: "HTTP", correct: false },
            { text: "VoIP", correct: true },
            { text: "LAN", correct: false },
        ]
    },
    {
        question: "What is the name of the first electronic computer?",
        answers: [
            { text: "UNIVAC", correct: false },
            { text: "ENIAC", correct: true },
            { text: "IBM 701", correct: false },
            { text: "Z3", correct: false },
        ]
    },
    {
        question: "Who is known as the father of the World Wide Web?",
        answers: [
            { text: "Tim Berners-Lee", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: false },
            { text: "Mark Zuckerberg", correct: false },
        ]
    },
    {
        question: "What is the primary function of an operating system?",
        answers: [
            { text: "To provide internet access", correct: false },
            { text: "To create multimedia content", correct: false },
            { text: "To protect against viruses", correct: false },
            { text: "To manage computer hardware and software resources", correct: true },
        ]
    }
];

// Get references to HTML elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timeDisplay = document.getElementById("time");

let timer; 
const totalTime = 60; // Total time for the quiz in seconds
let currentQuestionIndex = 0; // Track the current question index
let score = 0; // Track the user's score

// Function to start the timer
function startTimer() {
    let timeLeft = totalTime; 
    timeDisplay.innerHTML = timeLeft; 

    timer = setInterval(() => {
        timeLeft--; 
        timeDisplay.innerHTML = timeLeft; 

        if (timeLeft <= 0) {
            clearInterval(timer); 
            showScore(); // Show score when time runs out
        }
    }, 1000); 
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer); 
    timeDisplay.innerHTML = totalTime; 
}

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0; // Reset question index for a new quiz
    score = 0; // Reset the score
    nextButton.innerHTML = "Next"; // Set the next button text
    resetTimer(); // Reset the timer
    startTimer(); // Start the timer
    showQuestion(); // Show the first question
}

// Function to display the current question
function showQuestion() {
    resetState(); // Clear the previous question and answers
    let currentQuestion = questions[currentQuestionIndex]; 
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); 
        button.innerHTML = answer.text; 
        button.classList.add("btn"); 
        answerButtons.appendChild(button); 

        // If the answer is correct, mark it
        if (answer.correct) {
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer); // Attach event listener for answer selection
    });
}

// Function to reset the state before showing a new question
function resetState() {
    nextButton.style.display = "none"; // Hide the next button
    while (answerButtons.firstChild) { 
        answerButtons.removeChild(answerButtons.firstChild); // Remove all answer buttons
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target; 
    const isCorrect = selectedBtn.dataset.correct === "true"; 

    if (isCorrect) {
        selectedBtn.classList.add("correct"); 
        score++; // Increment score if the answer is correct
    } else {
        selectedBtn.classList.add("incorrect"); 
    }

    // Disable all answer buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Highlight the correct button
        }
        button.disabled = true; // Disable the button
    });
    nextButton.style.display = "block"; // Show next button
}

// Function to show the user's score at the end of the quiz
function showScore() {
    clearInterval(timer); // Clear the timer
    resetState(); // Reset the state for score display
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML = "Restart Quiz!"; 
    nextButton.style.display = "block"; // Show the restart button
}

// Function to handle the next button click
function handleNextButton() {
    // Check if time is still available
    if (timeDisplay.innerHTML > 0) {
        currentQuestionIndex++; // Move to the next question
        if (currentQuestionIndex < questions.length) {
            showQuestion(); // Display the next question
        } else {
            showScore(); // Show the score if no more questions
        }
    } else {
        // If time is up, restart the quiz and reset the question index
        startQuiz();
    }
}
// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton(); // Proceed to the next question
    } else {
        startQuiz(); // Reset the quiz when clicking "Restart Quiz!"
    }
});

// Start the quiz when the script is executed
startQuiz();