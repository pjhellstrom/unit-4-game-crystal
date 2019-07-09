// Set variables --------------------------------------------------------
var goalValue = 0;
var goalValueMax = 200;
var crystalValues = [0, 0, 0, 0];
var crystalValueMax = 20;
var guessValue = 0;
var pointsAdded = 0;
var winCount = 0;
var loseCount = 0;

var a = 3;
var b = "3";
var c = a + b;
console.log(c);

// Randomize goal value --------------------------------------------------
goalValue = Math.floor(Math.random() * goalValueMax);

// Randomize crystal values ----------------------------------------------
for (i = 0; i < crystalValues.length; i++) {
  crystalValues[i] = Math.floor(Math.random() * crystalValueMax);
}// end for-loop

// Functions ----------------------------------------------------------

// function getClick() {
    $(document).ready(function() {
    $("#crystal0").click( function() {addPoints( $("#crystal0").attr("value") )});
    $("#crystal1").click( function() {addPoints( $("#crystal1").attr("value") )});
    $("#crystal2").click( function() {addPoints( $("#crystal2").attr("value") )});
    $("#crystal3").click( function() {addPoints( $("#crystal3").attr("value") )});
    })
// }// end getClick()
    
function addPoints(a) {
    pointsAdded = crystalValues[a];
    guessValue = guessValue + pointsAdded;
    updateStats();
    decision();
}// end addPoints()

function updateStats() {
    console.log("LOOK AT THIS too: " + guessValue);
    $("#goalValue").text(goalValue)
    $("#guessValue").text(guessValue)
    $("#winCount").text(winCount)
    $("#loseCount").text(loseCount) 
}// end updateStats()

// Decision function -----------------------------------------------------
function decision() {

    // Case1 : if guess is under goal - allow more guesses
    if (guessValue < goalValue) {
        getClick();
    }// end if

    // Case2 : if guess is under goal - allow more guesses
    else if (guessValue == goalValue) {
        // Alert winner
        alert("Winner!")
    }// end else if

    // Case3 : if guess is under goal - allow more guesses
    else if (guessValue > goalValue) {
        // Alert game over
        alert("Game over!")
    }// end else

}// end decision()

// Console log ----------------------------------------------------------
console.log("random number array: " + crystalValues)