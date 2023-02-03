// Define DOM elements
var startScreenElement = document.querySelector("#start-screen");
var quizElement = document.querySelector("#quiz");
var timerElement = document.querySelector("#time");
var questionsElement = document.querySelector("#questions");
var choicesElement = document.querySelector("#choices");
var endScreenElement = document.querySelector("#end-screen");
var finalScoreElement = document.querySelector("#final-score");
var initialsElement = document.querySelector("#initials");
var feedbackElement = document.querySelector("#feedback");

// Define buttons
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start");

// Set Default value
var currentQuestionNumber = 0;
var timer = 0;
var timercount = quizQuestions.length * 15;

//Functions
// Fuction - Timer
function countDown() {

  // Timer countdown with setInterval function
  timer = setInterval(function () {
    timercount = timercount - 1;
    timerElement.textContent = timercount;

    // Whem time reaches 0, stop the timer with clearInterval function, end the quiz
    if (timercount === 0) {
      quizEnd();
    }
  }, 1000);
};

// Function - Start Quiz
function startQuiz() {

  // Hide start screen
  startScreenElement.style.display = "none";

  // Un-hide questions screen
  quizElement.style.display = "block";

  // Start timer
  countDown();

  // Show starting time
  timerElement.textContent = timercount;

  // Start the get question function
  showQuestion();

};

// Event listener button - to trigger Start quiz function
startButton.addEventListener("click", startQuiz);

// Function - Get Question
function showQuestion() {

  // Get current question from array
  var currentQuestion = quizQuestions[currentQuestionNumber];
  // Update question with current question
  questionsElement.textContent = currentQuestion.question;

  // Start the show choices function
  showChoices();

};

// Function - Show Choices
function showChoices() {

  // Clear out any old question choices
  choicesElement.innerHTML = "";

  // Current question
  var currentQuestion = quizQuestions[currentQuestionNumber];

  // Loop through the code below for the no. of choices available in each question
  for (var i = 0; i < currentQuestion.choices.length; i++) {

    // Current option button
    var optionButton = document.createElement("button");
    optionButton.setAttribute("class", "choices");
    // Set each option button to show content of each choice
    optionButton.setAttribute("value", currentQuestion.choices[i])
    optionButton.textContent = currentQuestion.choices[i];

    // Event listener button - to trigger checkAnswer function
    optionButton.addEventListener("click", checkAnswer);

    // Append Button content to the choicesElement
    choicesElement.appendChild(optionButton);

  };
};

// Function - Check Answer
function checkAnswer(selectedoption) {

  var currentQuestion = quizQuestions[currentQuestionNumber];

  // If answer is correct
  if (selectedoption.target.value === currentQuestion.correctAnswer) {
    // Correct answer feedback
    feedbackElement.textContent = "Correct!";
  }

  else {
    // Or else penalize time by 10 sec
    timercount = timercount - 10;

    // Stops the timer to become negative
    if (timercount < 0) {
      timercount = 0;
    }
    // Update the timer
    timerElement.textContent = timercount;
    // Wrong answer feedback
    feedbackElement.textContent = "Wrong! The correct answer is " + currentQuestion.correctAnswer;

  }

  // To flash the feedback
  feedbackElement.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 1000);

  // Next question
  currentQuestionNumber = currentQuestionNumber + 1;

  // Show next question until last question, then trigger end quiz function
  if (currentQuestionNumber < quizQuestions.length) {
    showQuestion();
  } else {
    clearInterval(timer);
    quizEnd();
  }
}

// Function - End Quiz
function quizEnd() {

  // Stop timer
  clearInterval(timer);

  // Hide questions section
  quizElement.style.display = "none";

  // Show end screen
  endScreenElement.style.display = "block";

  // Show final score
  finalScoreElement.textContent = timercount;

};

// Function - Save Score Function
function saveHighscore() {

  // Get value from input box
  var currentInitials = initialsElement.value.trim();

  // Get saved scores from localstorage, or if empty, set to empty array

    var currentScoresList = localStorage.getItem("highscores");
    var allScoresArray;

    if (currentScoresList === null) {
      allScoresArray = [];
    } else {
      allScoresArray = JSON.parse(currentScoresList);
    }

    // Format new score object for current user
    var newUserScore = {
      score: timercount,
      initials: currentInitials
    }

    allScoresArray.push(newUserScore);

    var newScoresString = JSON.stringify(allScoresArray);
    localStorage.setItem("highscores", newScoresString);

    // Redirect to next page
    location.href = "highscores.html";
  };


//Event listener button - to submit initials and trigger save high score function
submitButton.addEventListener("click", saveHighscore);
