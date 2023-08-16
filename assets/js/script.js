// creating variables that point to variouis html elements
var startBtn = document.getElementById("startBtn");
var description = document.getElementById("description");
var questionBox = document.getElementById("questionBox");
var questionElement = document.getElementById("question");
var answers = document.getElementById("answers");
var result = document.getElementById("result");
var resultText = document.getElementById("resultText");

// creating varaibles that will be needed
var currentQuestionIndex = 0;
var timeLeft = 60;
var score = 0;

// runs when start button is clicked
function startGame() {
    startBtn.classList.add("hidden");
    description.classList.add("hidden");
    questionBox.classList.remove("hidden");
  }

startBtn.addEventListener("click", startGame);