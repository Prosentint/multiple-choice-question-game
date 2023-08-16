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

// runs when start button is clicked to hide content no longer needed and displays questions
function startGame() {
    startBtn.classList.add("hidden");
    description.classList.add("hidden");
    questionBox.classList.remove("hidden");
    showQuestion();
}

// displays the current question and answers, based on currentQuestionIndex, onto the questionbox 
function showQuestion() {
    var question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;
    answers.innerHTML = "";
    question.answers.forEach((answer, index) => {
      var button = document.createElement("button");
      button.innerText = answer;
      button.classList.add("answer");
      button.addEventListener("click", () => selectAnswer(index, question.correctAnswer));
      answers.appendChild(button);
    });
  }

  function selectAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
      score += 10;
      resultText.innerText = "Correct!";
    } else {
      timeLeft -= 10;
      resultText.innerText = "Incorrect!";
    }
    currentQuestionIndex++;
    
  }

// runs when start button is clicked
startBtn.addEventListener("click", startGame);