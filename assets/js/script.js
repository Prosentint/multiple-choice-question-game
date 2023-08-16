// creating variables that point to various html elements
var startBtn = document.getElementById("startBtn");
var description = document.getElementById("description");
var questionBox = document.getElementById("questionBox");
var questionEl = document.getElementById("question");
var answers = document.getElementById("answers");
var result = document.getElementById("result");
var resultText = document.getElementById("resultText");
var timeLeftEl = document.getElementById("timeLeft");
var initialsInput = document.getElementById("initials");
var submitBtn = document.getElementById("submitBtn");
var scoreForm = document.getElementById("scoreForm");
var scoresList = document.getElementById("scores");

// creating varaibles that will be needed
var gameRunning = false;
var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;

// runs when start button is clicked to hide content no longer needed and displays questions
function startGame() {
    startBtn.classList.add("hidden");
    description.classList.add("hidden");
    questionBox.classList.remove("hidden");
    gameRunning = true;
    timeLeftEl.innerText = timeLeft;
    showQuestion();
    startTimer();
}

// Starts a timer for how ever many seconds timeLeft is, if timeLeft goes below 0 or the game ended some other how before then it clears the timer
function startTimer() {
 var timer = setInterval(function() {
    timeLeft--;
    timeLeftEl.innerText = timeLeft;
    if ((timeLeft <= 0)|| (!gameRunning)) {
        clearInterval(timer);
        timeLeftEl.innerHTML = "";
        endGame();
    }
 }, 1000)
}

// displays the current question and answers, based on currentQuestionIndex, onto the questionbox 
function showQuestion() {
    var question = questions[currentQuestionIndex];
    questionEl.innerText = question.question;
    answers.innerHTML = "";
    // cycles through each possible answer choice for a given question and appens the selections to the page
    question.answers.forEach((answer, index) => {
      var button = document.createElement("button");
      button.innerText = answer;
      button.classList.add("answer");
      button.addEventListener("click", () => selectAnswer(index, question.correctAnswer));
      answers.appendChild(button);
    });
}

  // Runs when one of the answer choice buttons is chosen takes the index of the answer selected and compares to to the saved index of the known correct answer
function selectAnswer(selectedIndex, correctIndex) {
        // determines if the selection was correct or not
    if (selectedIndex === correctIndex) {
      score += 10;
      resultText.innerText = "Correct!";
    } else {
      timeLeft -= 10;
      resultText.innerText = "Incorrect!";
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
        return;
    }
    showResults();
}

// called after selecting an answer and will display either correct or incorrec
function showResults() {
    result.classList.remove("hidden");
    // removes the result of the last question after some time
    setTimeout(function() {
        result.classList.add("hidden");
        // Ensures that even if someone is ripidly spam clicking and ends the game before this timeout function is called that the end results will still appear
        if (!gameRunning){
            endGame();
        }
    }, 700);
}

// Called when you run out of questions or timer ends to hide question box and reveal final score
function endGame() {
    gameRunning = false;
    questionBox.classList.add("hidden");
    resultText.innerText = "Game Over! Your final score is " + score;
    result.classList.remove("hidden");
    scoreForm.classList.remove("hidden");
}

// Runs when submiting the score form ensures that initials were submited to accompany the score. If it does then it saves the score and redirects to highscores
function submitScore(event) {
    event.preventDefault();
    var initials = initialsInput.value.toUpperCase();
    if (initials.length < 2){
        alert("Must input atleast 2 initials to submit");
        return;
    }
    var submittedScore = {initials, score};

    // checks the current value in scores local storage and returns as objects unless empty
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(submittedScore);
    // sorts local storage values so that highest score is on top
    scores.sort((a, b) => b.score - a.score);
    // saves to local storage
    localStorage.setItem("scores", JSON.stringify(scores));
    location.href = "highscores.html";
    displayScores();
}

function displayScores() {
    scoresList.innerHTML = "";

    // checks the current value in scores local storage and returns as objects unless empty
     var scores = JSON.parse(localStorage.getItem("scores")) || [];

    // cycles through each object in scores local storage and prints out initials and score
    scores.forEach(score => {
        var li = document.createElement("li");
        li.classList.add("score");
        li.textContent = `${score.initials}: ${score.score}`;
        scoresList.appendChild(li);
    });
}
console.log(window.location.pathname);

// Checks what page the user is on
if (document.body.classList.contains('index')) {
    // checks if start button is clicked
    startBtn.addEventListener("click", startGame);

    // checks if submit button is clicked
    submitBtn.addEventListener("click", submitScore);
}else if(document.body.classList.contains('highscore')){
    displayScores();
}



