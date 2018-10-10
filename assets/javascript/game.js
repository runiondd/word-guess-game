var Game = {
    numGuessCount: 0,
    guessedLetters: [],
    guessingWord: [],
    challengeWords:           
    [   
        "GIBSON",
        "FENDER",
        "PRS",
        "GRETSCH",
        "NOVO",
        "ANDERSON",
        "NASH",
        "EPIPHONE",
        "IBANEZ"],
   
    didWin : function (keyPress) {
        console.log("didWin();");
        console.log("guessedLetters.indexOf" + Game.guessedLetters.indexOf("_") );
        if(Game.guessedLetters.indexOf("_") === -1) {
            console.log("Win");
        } else {
            console.log("No Win");
        }
        //if we got here we've traversed the entire array and had matches in both colums meaning the user guessed all letters.  Otherwise
        // we'd have returned false already (above)
        return true;
    },
        
    recordGuess : function (keyPress) {
        // console.log("recordGuess();");
        // console.log("guessingWordLength=" + Game.guessingWord.length);
        for (var i=0; i < Game.guessingWord.length; i++) {
            // console.log("Guessing guessingWord[i]: " + Game.guessingWord[i]);
            // console.log("keyPress: " + keyPress);
            if (Game.guessingWord[i] === keyPress) {
                Game.guessedLetters[i] = keyPress;
            } 
            // console.log("Game.guessedLetters[i]=" + Game.guessedLetters[i]);
        }
    },

    hasPreviouslyMadeThisGuess : function (keyPress) {  
        console.log("hasPreviouslyMadeThisGuess();= " + keyPress);
        if (Game.guessedLetters.indexOf(keyPress) === -1) {
            return false;
        }
        return true;
    },

    selectChallengeWord : function (index) {
        var currentWordIndex = Math.floor(Math.random() * Game.challengeWords.length);
        Game.guessingWord =  Game.challengeWords[currentWordIndex];
        console.log("selectChallengeWord=" + Game.guessingWord);
    }
};

function initializeGame() {
    //console.log("Initialize();");
    Game.selectChallengeWord();
    for (var i = 0; i < Game.guessingWord.length; i++) {
        Game.guessedLetters[i] = "_";
       
    } 
//console.log("Guessing Letters Len: " + Game.guessedLetters.length);
}   

document.onkeyup = function(event) {
    var keyPress = event.key.toUpperCase();
    console.log(keyPress)
    Game.numGuessCount++;

    if (!Game.hasPreviouslyMadeThisGuess(keyPress)) {
        Game.recordGuess(keyPress);
        Game.didWin(keyPress);   
    } else {
        console.log("You've already guessed this. Try another letter.");
    }   
     updateDisplay();
}

 function updateDisplay() {
    console.log("updateDisplay");
    var displayGuessesString = "";
     for (var x = 0; x < Game.guessedLetters.length; x++) {
          displayGuessesString = displayGuessesString + Game.guessedLetters[x];
     }
     document.getElementById("numberOfAttemptsLbl").innerHTML = "Guesses: " + displayGuessesString;
}



