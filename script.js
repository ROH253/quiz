// Quiz questions and answers
const quizData = [
    { question: 'What is the capital of France?', answer: 'Paris', type: 'text' },
    { question: 'What is 5 + 7?', answer: '12', type: 'text' },
    { question: 'Is the sky blue?', answer: 'True', type: 'true/false' }
];

// Object to store team data
let teamsData = {};

// Track the current question and score
let currentQuestionIndex = 0;
let score = 0;
let teamName = "";

// Start the quiz after the team name is entered
function startQuiz() {
    teamName = document.getElementById("teamName").value.trim();
    if (teamName === "") {
        alert("Please enter a team name.");
        return;
    }

    if (teamsData[teamName]) {
        alert("Team name already exists. Please choose another name.");
        return;
    }

    // Initialize team data
    teamsData[teamName] = { responses: [], score: 0 };

    // Hide team input and display quiz
    document.getElementById("team-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";

    loadQuestion();
}

// Load the current question
function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const questionData = quizData[currentQuestionIndex];
        document.getElementById("question-container").innerHTML = `
            <h2>Question ${currentQuestionIndex + 1}</h2>
            <p>${questionData.question}</p>
            <input type="text" id="answer" placeholder="Your answer">
        `;
    } else {
        // End the quiz and show score
        document.getElementById("quiz-section").style.display = "none";
        document.getElementById("score-section").style.display = "block";
        document.getElementById("final-score").innerText = `Your score is ${teamsData[teamName].score} out of ${quizData.length}`;
    }
}

// Submit the answer and move to the next question
function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    if (userAnswer === "") {
        alert("Please enter an answer.");
        return;
    }

    // Store the response
    teamsData[teamName].responses.push(userAnswer);

    // Check if the answer is correct
    if (userAnswer.toLowerCase() === quizData[currentQuestionIndex].answer.toLowerCase()) {
        score++;
        teamsData[teamName].score = score;
    }

    currentQuestionIndex++;
    loadQuestion();
}

// Retrieve and display team data
function retrieveTeamData() {
    const retrieveTeam = document.getElementById("retrieveTeam").value.trim();
    const teamData = teamsData[retrieveTeam];
    
    if (teamData) {
        let dataHTML = `<h2>Team: ${retrieveTeam}</h2><p>Score: ${teamData.score}</p><ul>`;
        teamData.responses.forEach((response, index) => {
            dataHTML += `<li>Question ${index + 1}: ${response}</li>`;
        });
        dataHTML += '</ul>';
        document.getElementById("team-data").innerHTML = dataHTML;
    } else {
        document.getElementById("team-data").innerHTML = "<p>No data found for this team.</p>";
    }
}
