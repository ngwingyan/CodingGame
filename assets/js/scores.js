//Function - to print highscores
    // to print scores in a list on the page from local storage 

function printHighscores() {

    // Get scores from local storage, if empty result, set to empty array
    var ScoreList = localStorage.getItem("highscores");
    if (ScoreList == null) {
        ScoreList = [];
    }
    else {
        ScoreList = JSON.parse(localStorage.getItem("highscores"))
    };

    // Sort the result in descending order of score
    var sortedScoreList = ScoreList.sort(function (a, b) {
        return b.score - a.score;
    });

    // Display score on highscore page using for loop
    for (var i = 0; i < sortedScoreList.length; i++) {
        var item = sortedScoreList[i];
        var li = document.createElement("li");
        li.textContent = item.initials + " - " + item.score;
        li.setAttribute("data-index", i);
        var olElement = document.getElementById("highscores");
        olElement.appendChild(li);
    };

};


// Function - to clear high scores
function clearHighscores() {
    localStorage.clear();
    location.reload();
};

// Event listener button - click the clear button to trigger clear highscores function
var clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearHighscores);

// Ensure print highscores function runs whenever the page loads
printHighscores();