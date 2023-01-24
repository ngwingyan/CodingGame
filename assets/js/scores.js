// print highscores function - to print scores in a list on the page from local storage 

function printHighscores() {
    
    // Get scores from local storage, if empty, set to empty array
    var list = localStorage.getItem("highscores");
    if (list == null) {
        scoreRecord = [];
    }
    else {
        scoreRecord = JSON.parse(list);
    }

    // sort the result in descending order
    scoreRecord.sort(function (a, b) {
        return b.score - a.score;
    });

    // display score on highscore page using for loop
    for (var i = 0; i < scoreRecord.length; i++) {
        var score = scoreRecord[i];
        var li = document.createElement("li");
        li.textContent = score.initials + " - " + score.score;
        li.setAttribute("data-index", i);
        var olElement = document.getElementById("highscores");
        olElement.appendChild(li);
}};


// clear high scores function - click on clear button to clear scores in local storage
function clearHighscores() {
    localStorage.clear();
    location.reload();
};

// clicking the clear button to trigger clear highscores function
var clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearHighscores);

// ensure print highscores function runs whenever the page loads
printHighscores();