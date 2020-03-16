// Array of questions
var questions = [
"Commonly used data types DO NOT include:", 
"The condition in an if/else statement is enclosed within ____.",
"Arrays in JavaScript can be used to store ____.",
"String values must be enclosed within ____ when being assigned to variables",
"A very useful tool used during development and debugging for printing content to the debugger is:"
];

// Array of choice sets
var choices = [
["strings", "booleans", "alerts", "numbers"], 
["quotes", "curly brackets", "parentheses", "square brackets"],
["numbers and strings", "other arrays", "booleans", "all of the above"],
["commas", "curly brackets", "quotes", "parentheses"],
["JavaScript", "terminal/bash", "for loops", "console.log"]
];

// Array of true answers
var trueArray = [choices[0][2], choices[1][2], choices[2][3], choices[3][2], choices[4][3]]

// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startScreenEl = document.getElementById("start-screen");
var questionTitle = document.getElementById("question-title");
var endScreenEl = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var newButton;

// hides start screen, starts timer, displays first question
function startQuiz() {
  clockTick();
  startScreenEl.setAttribute("class", "hide");
  questionsEl.setAttribute("style", "display: block");
  getQuestion();
}

// loops through choice sets and creates buttons with choices // loops through question array and displays question
function getQuestion() {
  $(choicesEl).empty();
  $(questionTitle).empty();    
  for (var i = currentQuestionIndex; i < questions.length; i++) {
    questionTitle.textContent = questions[i];
    var choicesSet = choices[i];
      for (var j = 0; j < choicesSet.length; j++) {
        newButton = document.createElement("button");
        newButton.textContent = choicesSet[j];
        choicesEl.appendChild(newButton);
        newButton.addEventListener("click", questionClick);
      }
  return;
  }
}

// runs when choice button is clicked
function questionClick() {
  currentQuestionIndex++;
  feedbackEl.setAttribute("style", "display: block");
  setTimeout(function() {
    feedbackEl.setAttribute("style", "display: none");
    }, 
  1000);
  if (event.target.textContent === trueArray[0]) {
    feedbackEl.textContent = "Correct!";
    trueArray.shift();
    getQuestion();
  }
  else {
    feedbackEl.textContent = "Wrong!";
    time = time - 10;
    trueArray.shift();
    getQuestion();
  }
  if (trueArray.length === 0) {
    quizEnd();
  }
}

// timer interval set
function clockTick() {
  timerId = setInterval(function() {
    timerEl.textContent = time;
    time--;
  },
  1000);
  if (time <= 0) {
    quizEnd();
  }
}

// sets time left as score, clears interval, hides question section, shows end screen
function quizEnd() {
  clearInterval(timerId);
  finalScore.textContent = time;
  questionsEl.setAttribute("class", "hide");
  endScreenEl.setAttribute("style", "display: block");
}

// saves high scores to local storage
function saveHighscore() {
  var initials = initialsEl;
  if (initials !== "") {
      localStorage.setItem('userInitials', JSON.stringify(initials.value));
      localStorage.setItem('userScore', finalScore.textContent);
      window.location.href = "highscores.html";
    }
}

// user clicks button to start quiz
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveHighscore);

