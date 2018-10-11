var Game = {
    numGuessCount: 0,
    wins: 0,
    guessedLetters: [],
    guessingWord: [],
    incorrectGuesses: [],
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
        if(Game.guessedLetters.indexOf("_ ") === -1) {
            console.log("Win");
            Game.wins++;
           
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
            if (Game.guessingWord[i] === keyPress) {
                Game.guessedLetters[i] = keyPress;
            } else {             
                if((Game.incorrectGuesses.indexOf(keyPress) == -1) && (Game.guessingWord.indexOf(keyPress) == -1)) { //only add if the guess is not already in the array
                    Game.incorrectGuesses[Game.incorrectGuesses.length] = keyPress;   
                }
            }
            Game.displayIncorrectGuesses();    // console.log("Game.guessedLetters[i]=" + Game.guessedLetters[i]);
        }
    },

    hasPreviouslyMadeThisGuess : function (keyPress) {  
        console.log("hasPreviouslyMadeThisGuess();= " + keyPress);
        if (Game.guessedLetters.indexOf(keyPress) === -1) {
            return false;
        }
        return true;
    },

    displayIncorrectGuesses : function () {
        var incorrectLettersStr = "";

        for (var i = 0; i < Game.incorrectGuesses.length; i++) {
            if (Game.incorrectGuesses === 0) {
                incorrectLettersStr = Game.incorrectGuesses[i] + " ";
            } else {
                incorrectLettersStr += Game.incorrectGuesses[i] + " ";
            }
        } 
        document.getElementById("wrongLetters").innerHTML = "Incorrect Guesses: " + incorrectLettersStr;
    },

    selectChallengeWord : function (index) {
        var currentWordIndex = Math.floor(Math.random() * Game.challengeWords.length);
        Game.guessingWord =  Game.challengeWords[currentWordIndex];
        console.log("guessingWord:" + Game.guessingWord);
    }
};

function initializeGame() {
    console.log("Initialize();");
    Game.selectChallengeWord();
    for (var i = 0; i < Game.guessingWord.length; i++) {
        Game.guessedLetters[i] = "_ ";
    } 
    updateDisplay();
   
   // Game.displayIncorrectGuesses();
    console.log("Guessing Letters Len: " + Game.guessedLetters.length);
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
    
    document.getElementById("guessesLbl").innerHTML = "Guesses: " + displayGuessesString;
    document.getElementById("wins").innerHTML = "Total Wins: " + Game.wins;
    Game.displayIncorrectGuesses(); 
}



