// Set variables --------------------------------------------------------
const targetValueMin = 19;
const targetValueMax = 120;
const crystalValueMax = 12;
var crystalValues = [0, 0, 0, 0];
var targetValue = 0;
var playerValue = 0;
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
    // Randomize target value between floor and ceiling values -------------
    while (targetValue < targetValueMin) {
    targetValue = Math.floor(Math.random() * targetValueMax);
    }
    // Randomize crystal values ------------------------------------------
    for (i = 0; i < crystalValues.length; i++) {
    crystalValues[i] = Math.ceil(Math.random() * crystalValueMax);
    }
}//end setValues()

function getClick() {
    $("#crystal0").click( function() {addPoints( $("#crystal0").attr("value") )});
    $("#crystal1").click( function() {addPoints( $("#crystal1").attr("value") )});
    $("#crystal2").click( function() {addPoints( $("#crystal2").attr("value") )});
    $("#crystal3").click( function() {addPoints( $("#crystal3").attr("value") )});
}// end getClick()
    
function addPoints(a) {
    pointsAdded = crystalValues[a];
    playerValue = playerValue + pointsAdded;
    updateStats();
    decision();
}// end addPoints()

function updateStats() {
        $("#targetValue").text(targetValue)
        $("#playerValue").text(playerValue)
        $("#winCount").text(winCount)
        $("#loseCount").text(loseCount) 
}// end updateStats()

function resetStats() {
    crystalValues = [0, 0, 0, 0];
    targetValue = 0;
    playerValue = 0;
    pointsAdded = 0;
    updateStats();
}// end reset()

function resetWinLose() {
    winCount = 0;
    loseCount = 0;        
}

// Decision function -----------------------------------------------------
function decision() {

    // Case1 : if player is under target - allow more clicks
    if (playerValue < targetValue) {
        return;
    }// end if

    // Case2 : if player is equal to target - add to win count, setup new session
    else if (playerValue == targetValue) {
        winCount++;
        // Alert winner
        setTimeout(alert("That's the number!"),0);
            // Check for game over
            if (winCount > 2) {
                resetStats();
                resetWinLose();
                hideGameScreen();
                    // Setup end screen
                    $("#endScreen").removeClass("bg-warning")
                    $("#endScreen").removeClass("bg-danger")                    
                    $("#endScreen").addClass("bg-success")
                    $("#endHeader").text("You did it!")
                showEndScreen();
            }
            else {
            setTimeout(resetStats,0)
            setTimeout(setValues,0)
            setTimeout(updateStats,20)            
            }
    }// end else if

    // Case3 : else player is over target - add to lose count, setup new session
    else {
        loseCount++;
        // Alert game over
        setTimeout(alert("Too high!"),0);
        // Check for game over
            if (loseCount > 2) {
                resetStats();   
                resetWinLose();             
                hideGameScreen();
                    // Setup end screen
                    $("#endScreen").removeClass("bg-warning")
                    $("#endScreen").removeClass("bg-success")                    
                    $("#endScreen").addClass("bg-danger")
                    $("#endHeader").text("Sorry, try again!")
                showEndScreen();
            }
            else {
            setTimeout(resetStats,0)
            setTimeout(setValues,0)
            setTimeout(updateStats,10)   
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