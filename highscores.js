
var goBack = document.getElementById("go-back");
var clearScore = document.getElementById("clear");
var scoreList = document.getElementById("score-list");
var userInitials = JSON.parse(localStorage.getItem("userInitials"));
var highScore = JSON.parse(localStorage.getItem('userScore'));


// Emptys 
function printHighscores() {
  if (userInitials !== null) {
    var scoreColumn = document.createElement("li");
    scoreList.appendChild(scoreColumn);
    scoreColumn.textContent = userInitials + " - " + highScore;
  }
}

function backToQuiz() {
  window.location.href = "index.html";
}

function clearHighscores() {
  window.localStorage.removeItem("userInitials");
  window.localStorage.removeItem("userScore");
  $(scoreList).empty();
}

goBack.addEventListener("click", backToQuiz);
clearScore.addEventListener("click", clearHighscores);
document.onload = printHighscores();