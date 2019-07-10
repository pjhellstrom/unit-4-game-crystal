// Set variables --------------------------------------------------------
const goalValueMax = 10;
const crystalValueMax = 20;
var crystalValues = [0, 0, 0, 0];
var goalValue = 0;
var guessValue = 0;
var pointsAdded = 0;
var winCount = 0;
var loseCount = 0;

// Initialize game -------------------------------------------------------
$(document).ready(function() {
    // From start screen
    $("#startButton").click(hideStartScreen);
    $("#startButton").click(setValues);
    $("#startButton").click(updateStats);
    $("#startButton").click(showGameScreen);
    $("#startButton").click(getClick);
    
    // From game over screen
    $("#restartButton").click(hideEndScreen);
    $("#restartButton").click(setValues);
    $("#restartButton").click(updateStats);
    $("#restartButton").click(showGameScreen);
    $("#restartButton").click(getClick);
});

// Functions -------------------------------------------------------------

function setValues() {
    // Randomize goal value ----------------------------------------------
    goalValue = Math.floor(Math.random() * goalValueMax);

    // Randomize crystal values ------------------------------------------
    for (i = 0; i < crystalValues.length; i++) {
    crystalValues[i] = Math.floor(Math.random() * crystalValueMax);
    }// end for-loop
}//end setValues()

function getClick() {
    $("#crystal0").click( function() {addPoints( $("#crystal0").attr("value") )});
    $("#crystal1").click( function() {addPoints( $("#crystal1").attr("value") )});
    $("#crystal2").click( function() {addPoints( $("#crystal2").attr("value") )});
    $("#crystal3").click( function() {addPoints( $("#crystal3").attr("value") )});
}// end getClick()
    
function addPoints(a) {
    pointsAdded = crystalValues[a];
    guessValue = guessValue + pointsAdded;
    updateStats();
    decision();
}// end addPoints()

function updateStats() {
        $("#goalValue").text(goalValue)
        $("#guessValue").text(guessValue)
        $("#winCount").text(winCount)
        $("#loseCount").text(loseCount) 
}// end updateStats()

function resetStats() {
    crystalValues = [0, 0, 0, 0];
    goalValue = 0;
    guessValue = 0;
    pointsAdded = 0;
}// end reset()

function resetWinLose() {
    winCount = 0;
    loseCount = 0;        
}

// Decision function -----------------------------------------------------
function decision() {

    // Case1 : if guess is under goal - allow more guesses
    if (guessValue < goalValue) {
        return;
    }// end if

    // Case2 : if guess is equal to goal - add to win count, setup new session
    else if (guessValue == goalValue) {
        // Alert winner
        alert("That's the number!");
        winCount++;
            // Check for game over
            if (winCount > 2) {
                resetStats();
                resetWinLose();
                hideGameScreen();
                    // Setup end screen
                    $("#endScreen").removeClass("bg-warning")
                    $("#endScreen").addClass("bg-success")
                    $("#endHeader").text("You did it!")
                showEndScreen();
            }
            else {
            updateStats();
            resetStats();
            setValues();
            }
    }// end else if

    // Case3 : else guess is over goal - add to lose count, setup new session
    else {
        // Alert game over
        alert("Too high!");
        loseCount++;
            // Check for game over
            if (loseCount > 2) {
                resetStats();   
                resetWinLose();             
                hideGameScreen();
                    // Setup end screen
                    $("#endScreen").removeClass("bg-warning")
                    $("#endScreen").addClass("bg-danger")
                    $("#endHeader").text("Sorry, try again!")
                showEndScreen();
            }
            else {
            updateStats();
            resetStats();
            setValues();
            }
    }// end else

}// end decision()


// Hiding, showing elements ------------------------------------------

function hideStartScreen() {
    $("#startScreen").hide();
}

function showGameScreen() {
    $("#gameScreen").show();
}

function hideGameScreen() {
    $("#gameScreen").hide();
}

function showEndScreen() {
    $("#endScreen").show();
}

function hideEndScreen() {
    $("#endScreen").hide();
}


// Console log ----------------------------------------------------------
console.log("random number array: " + crystalValues)