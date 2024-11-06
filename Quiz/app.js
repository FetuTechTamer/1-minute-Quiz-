// Array of question objects for the quiz
const questions = [
    {
        question: "What does HTML stand for?", // The quiz question
        answers: [ // Possible answers for the question
            { text: "HyperText Markup Language", correct: true }, // Correct answer
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
            { text: "Google", correct: true }, // Correct answer
            { text: "IBM", correct: false },
        ]
    },
    {
        question: "What is the primary function of a VPN?",
        answers: [
            { text: "To provide a secure connection over the internet", correct: true }, // Correct answer
            { text: "To increase internet speed", correct: false },
            { text: "To block ads on websites", correct: false },
            { text: "To boost Wi-Fi signal strength", correct: false },
        ]
    },
    {
        question: "Which programming language is primarily used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }, // Correct answer
            { text: "Java", correct: false },
            { text: "C++", correct: false },
        ]
    },
    {
        question: "Which company developed the Windows operating system?",
        answers: [
            { text: "Apple", correct: false },
            { text: "Microsoft", correct: true }, // Correct answer
            { text: "IBM", correct: false },
            { text: "Google", correct: false },
        ]
    },
    {
        question: "What is the main function of a router?",
        answers: [
            { text: " To store data", correct: false },
            { text: "To manage user accounts", correct: false },
            { text: "To create websites", correct: false },
            { text: "To direct data packets between networks", correct: true }, // Correct answer
        ]
    },
    {
        question: "Which technology is used to make telephone calls over the Internet?",
        answers: [
            { text: "FTP", correct: false },
            { text: "HTTP", correct: false },
            { text: "VoIP", correct: true }, // Correct answer
            { text: "LAN", correct: false },
        ]
    },
    {
        question: "What is the name of the first electronic computer?",
        answers: [
            { text: "UNIVAC", correct: false },
            { text: "ENIAC", correct: true }, // Correct answer
            { text: "IBM 701", correct: false },
            { text: " Z3", correct: false },
        ]
    },
    {
        question: "Who is known as the father of the World Wide Web?",
        answers: [
            { text: "Tim Berners-Lee", correct: true }, // Correct answer
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
            { text: "To manage computer hardware and software resources", correct: true }, // Correct answer
        ]
    }
];

// Get references to HTML elements
const questionElement = document.getElementById("question"); // Element to display the current question
const answerButtons = document.getElementById("answer-buttons"); // Container for answer buttons
const nextButton = document.getElementById("next-btn"); // Button to proceed to the next question

let currentQuestionIndex = 0; // Index of the current question
let score = 0; // User's score

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0; // Reset question index
    score = 0; // Reset score
    nextButton.innerHTML = "Next"; // Set next button text
    showQuestion(); // Display the first question
}

// Function to show the current question
function showQuestion() {
    resetState(); // Clear previous question and answers
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question object
    let questionNo = currentQuestionIndex + 1; // Calculate question number for display
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question

    // Loop through each answer and create a button for it
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // Create a new button element
        button.innerHTML = answer.text; // Set button text to the answer
        button.classList.add("btn"); // Add a CSS class for styling
        answerButtons.appendChild(button); // Add button to the answer buttons container

        // If the answer is correct, set a data attribute
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Store correct status in a data attribute
        }
        button.addEventListener("click", selectAnswer); // Attach click event listener to the button
    });
}

// Function to reset the state before showing a new question
function resetState() {
    nextButton.style.display = "none"; // Hide the next button
    while (answerButtons.firstChild) { // Remove all existing answer buttons
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target; // Get the button that was clicked
    const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the answer is correct

    if (isCorrect) { // If the answer is correct
        selectedBtn.classList.add("correct"); // Highlight the correct answer
        score++; // Increment the score
    } else { // If the answer is incorrect
        selectedBtn.classList.add("incorrect"); // Highlight the incorrect answer
    }

    // Disable all answer buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Highlight correct button
        }
        button.disabled = true; // Disable the button
    });
    nextButton.style.display = "block"; // Show the next button
}

// Function to show the user's score at the end of the quiz
function showScore() {
    resetState(); // Reset the state for the score display
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // Show the score
    nextButton.innerHTML = "Restart Quiz!"; // Change button text to play again
    nextButton.style.display = "block"; // Show the button
}

// Function to handle the next button click
function handleNextButton() {
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // Show the next question
    } else {
        showScore(); // Show the score if no more questions
    }
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton(); // Proceed to the next question
    } else {
        startQuiz(); // Reset the quiz when clicking "Play Again!"
    }
});

// Start the quiz when the script is executed
startQuiz();